import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";
import Booking from "./Booking";

const toast = vi.hoisted(() => ({ error: vi.fn(), success: vi.fn() }));

vi.mock("sonner", () => ({ toast }));
vi.mock("@/components/Header", () => ({ default: () => <div>Header</div> }));
vi.mock("@/components/Footer", () => ({ default: () => <div>Footer</div> }));
vi.mock("@/components/SocialSidebar", () => ({ default: () => null }));
vi.mock("@/components/SEO", () => ({ default: () => null }));

const response = (body: unknown, ok = true) =>
  Promise.resolve({
    ok,
    json: () => Promise.resolve(body),
  } as Response);

const futureDate = (day: number) => {
  const date = new Date();
  date.setDate(date.getDate() + 7);
  while (date.getDay() !== day) date.setDate(date.getDate() + 1);
  return date.toISOString().slice(0, 10);
};

const renderBooking = (entry = "/book") =>
  render(
    <MemoryRouter initialEntries={[entry]}>
      <Booking />
    </MemoryRouter>,
  );

const completeDetails = () => {
  fireEvent.change(screen.getByLabelText(/child name/i), { target: { value: "Aarav" } });
  fireEvent.change(screen.getByLabelText(/parent name/i), { target: { value: "Riya Sharma" } });
  fireEvent.change(screen.getByLabelText(/mobile number/i), { target: { value: "9876543210" } });
  fireEvent.change(screen.getByLabelText(/email/i), { target: { value: "riya@example.com" } });
  fireEvent.click(screen.getByRole("button", { name: /continue/i }));
};

const reachReview = async () => {
  completeDetails();
  fireEvent.change(screen.getByLabelText(/appointment date/i), { target: { value: futureDate(6) } });
  const slot = await screen.findByRole("button", { name: /11:30 am available/i });
  fireEvent.click(slot);
  fireEvent.click(screen.getByRole("button", { name: /continue/i }));
};

describe("Booking", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    toast.error.mockReset();
    toast.success.mockReset();
    vi.stubGlobal("fetch", vi.fn(() => response({ available: true })));
    Object.defineProperty(window, "scrollTo", { value: vi.fn(), writable: true });
  });

  it("preselects a supported service from the query string", () => {
    renderBooking("/book?service=mundan");
    expect(screen.getByRole("heading", { name: /child and parent details/i })).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /back/i }));
    expect(screen.getByRole("button", { name: /mundan.*head shave/i })).toHaveAttribute("aria-pressed", "true");
  });

  it("shows Tuesday closure and does not request availability", () => {
    renderBooking("/book?service=kids-haircut");
    completeDetails();
    fireEvent.change(screen.getByLabelText(/appointment date/i), { target: { value: futureDate(2) } });
    expect(screen.getByRole("alert")).toHaveTextContent(/Tuesday is closed/i);
    expect(fetch).not.toHaveBeenCalled();
  });

  it("disables unavailable slots", async () => {
    vi.mocked(fetch).mockImplementation(() => response({ available: false }));
    renderBooking("/book?service=kids-haircut");
    completeDetails();
    fireEvent.change(screen.getByLabelText(/appointment date/i), { target: { value: futureDate(6) } });
    const slot = await screen.findByRole("button", { name: /11:30 am booked/i });
    expect(slot).toBeDisabled();
  });

  it("validates phone and email before continuing", () => {
    renderBooking("/book?service=kids-haircut");
    fireEvent.change(screen.getByLabelText(/child name/i), { target: { value: "Aarav" } });
    fireEvent.change(screen.getByLabelText(/parent name/i), { target: { value: "Riya" } });
    fireEvent.change(screen.getByLabelText(/mobile number/i), { target: { value: "123" } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: "bad-email" } });
    fireEvent.click(screen.getByRole("button", { name: /continue/i }));
    expect(toast.error).toHaveBeenCalledWith(expect.stringMatching(/valid 10-digit/i));
    expect(screen.getByRole("heading", { name: /child and parent details/i })).toBeInTheDocument();
  });

  it("shows a confirmation with the mocked booking reference", async () => {
    vi.mocked(fetch).mockImplementation((input, init) => {
      if (init?.method === "POST") return response({ success: true, appointment: { reference: "KS-TEST-123" } });
      return response({ available: true });
    });
    renderBooking("/book?service=kids-haircut");
    await reachReview();
    fireEvent.click(screen.getByRole("button", { name: /confirm booking/i }));
    expect(await screen.findByRole("heading", { name: /appointment is booked/i })).toBeInTheDocument();
    expect(screen.getByText("KS-TEST-123")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /add to google calendar/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /whatsapp confirmation/i })).toBeInTheDocument();
  });

  it("handles a failed mocked booking response without confirming", async () => {
    vi.mocked(fetch).mockImplementation((input, init) => {
      if (init?.method === "POST") return response({ success: false, message: "Booking service unavailable" }, false);
      return response({ available: true });
    });
    renderBooking("/book?service=kids-haircut");
    await reachReview();
    fireEvent.click(screen.getByRole("button", { name: /confirm booking/i }));
    await waitFor(() => expect(toast.error).toHaveBeenCalledWith("Booking service unavailable"));
    expect(screen.queryByRole("heading", { name: /appointment is booked/i })).not.toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /choose date and time/i })).toBeInTheDocument();
  });
});
