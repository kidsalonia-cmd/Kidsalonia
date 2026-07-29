export type InstagramMediaType = "image" | "carousel" | "reel";

export type InstagramPost = {
  postUrl: string;
  thumbnailUrl: string;
  caption: string;
  mediaType: InstagramMediaType;
  service?: string;
  featured?: boolean;
};

/**
 * Admin update guide:
 * 1. Open https://www.instagram.com/kidsalonia and copy the public post/reel URL.
 * 2. Replace the thumbnail with the public cover-image URL shown by Instagram.
 * 3. Write a short, descriptive caption for website visitors.
 * 4. Optionally set `service` to a slug supported by src/lib/booking.ts.
 * 5. Set `featured: true` on public, embeddable Reels to feature them above
 *    the grid. The homepage intentionally embeds no more than the first two.
 *
 * Instagram CDN thumbnail URLs can expire. The feed has an image-error fallback,
 * so an expired thumbnail never leaves a broken image or blocks booking/profile CTAs.
 * No access tokens or private API credentials belong in this client-side file.
 */
export const instagramPosts: InstagramPost[] = [
  {
    postUrl: "https://www.instagram.com/kidsalonia/p/DZ7UNG3CSDR/",
    thumbnailUrl:
      "https://scontent.cdninstagram.com/v/t51.82787-15/729674449_17887969722571576_3877560301630428989_n.jpg?stp=dst-jpg_e35_s640x640_tt6&_nc_cat=111&ccb=7-5&_nc_sid=18de74&efg=eyJlZmdfdGFnIjoiQ0FST1VTRUxfSVRFTS5iZXN0X2ltYWdlX3VybGdlbi5DMyJ9&_nc_ohc=-NLwfFvzo9MQ7kNvwFsRZbn&_nc_oc=AdoqWynQCj8L-OfO64WDsARF8Y5xu9y5-C88WR5TDIxANgWkqbey3zNDvXmjs69-KQ0&_nc_zt=23&_nc_ht=scontent.cdninstagram.com&_nc_gid=toyeBXarPTZN1BNKnwLrDQ&_nc_ss=7ba8c&oh=00_AQDmkeLjuQb3k7BU6BGTrmbRDcJRdcfNaB7QR3UzY8sQEg&oe=6A70066E",
    caption: "Colourful KidSalonia moments, happy smiles and salon-day fun in Gurugram.",
    mediaType: "carousel",
  },
  {
    postUrl: "https://www.instagram.com/reel/DZqBpuszGsg/",
    thumbnailUrl:
      "https://scontent.cdninstagram.com/v/t51.71878-15/724685164_1328501479259287_3297721029266214657_n.jpg?stp=dst-jpg_e35_s640x640_tt6&_nc_cat=109&ccb=7-5&_nc_sid=18de74&efg=eyJlZmdfdGFnIjoiQ0xJUFMuYmVzdF9pbWFnZV91cmxnZW4uQzMifQ%3D%3D&_nc_ohc=IM9i5Q8ro_sQ7kNvwFBfV0-&_nc_oc=Ado2rG6LkLaz78rFR_Ea7kDU2t1YraG3fCg-_vLpQteX5ymONPAOVCr5VCAA6NmFUpk&_nc_zt=23&_nc_ht=scontent.cdninstagram.com&_nc_gid=toyeBXarPTZN1BNKnwLrDQ&_nc_ss=7ba8c&oh=00_AQCxM8zPY76AFer5aM-WCbFlN7WprgpGrTCYGaHicJue2A&oe=6A6FF3A4",
    caption: "Bring your bestie for a playful salon experience and celebration-ready styling.",
    mediaType: "reel",
    service: "kids-hair-styling",
    featured: true,
  },
  {
    postUrl: "https://www.instagram.com/reel/DYFKuxIpJhF/",
    thumbnailUrl:
      "https://scontent.cdninstagram.com/v/t51.71878-15/693682799_2500252250465114_3249018242396685848_n.jpg?stp=dst-jpg_e35_s640x640_tt6&_nc_cat=111&ccb=7-5&_nc_sid=18de74&efg=eyJlZmdfdGFnIjoiQ0xJUFMuYmVzdF9pbWFnZV91cmxnZW4uQzMifQ%3D%3D&_nc_ohc=SJjTPGGyWfsQ7kNvwEPKT5R&_nc_oc=AdpwU95gjFxURbmnGAWtQ51Gl8OOaC_lXtoT1YsiC5Z0EagtzeNfFKp2tiJ1zef0f3M&_nc_zt=23&_nc_ht=scontent.cdninstagram.com&_nc_gid=toyeBXarPTZN1BNKnwLrDQ&_nc_ss=7ba8c&oh=00_AQAYTdi78Nmamcezsk1hc_BDn1XHk8jd4P_GVpwJcI4DRA&oe=6A6FD5DD",
    caption: "A fun look at kids hair days with patient, child-friendly salon care.",
    mediaType: "reel",
    service: "kids-haircut",
    featured: true,
  },
  {
    postUrl: "https://www.instagram.com/kidsalonia/reel/Da2MKL7pxyK/",
    thumbnailUrl:
      "https://scontent.cdninstagram.com/v/t51.82787-15/746984378_17892049758571576_5932774829440673706_n.jpg?stp=dst-jpg_e35_s640x640_tt6&_nc_cat=108&ccb=7-5&_nc_sid=18de74&efg=eyJlZmdfdGFnIjoiQ0xJUFMuYmVzdF9pbWFnZV91cmxnZW4uQzMifQ%3D%3D&_nc_ohc=bjzoaHuiRBAQ7kNvwGOqEXP&_nc_oc=Ado_8p-FLghRHPONEgzzcFoXmfBL7fNPm_vMp3B3eG9XXSif8wRjjtBjREki0maRDX8&_nc_zt=23&_nc_ht=scontent.cdninstagram.com&_nc_gid=toyeBXarPTZN1BNKnwLrDQ&_nc_ss=7ba8c&oh=00_AQDmTUwv1g4N-htXj4pupwESeH2FJufjlxGmCIfndbVIig&oe=6A6FDABE",
    caption: "Joyful summer salon moments created especially for little stars and families.",
    mediaType: "reel",
  },
  {
    postUrl: "https://www.instagram.com/kidsalonia/reel/Daz7b30JPoX/",
    thumbnailUrl:
      "https://scontent.cdninstagram.com/v/t51.82787-15/746909822_17891893218571576_5790757262808384313_n.jpg?stp=dst-jpg_e35_s640x640_tt6&_nc_cat=101&ccb=7-5&_nc_sid=18de74&efg=eyJlZmdfdGFnIjoiQ0xJUFMuYmVzdF9pbWFnZV91cmxnZW4uQzMifQ%3D%3D&_nc_ohc=rzowSF2SfSYQ7kNvwG3OPhy&_nc_oc=AdppsLOgBugShCxzwDdqu837Dg2ksBptt4Luk3mMDoCcx89hLUnQ0cvLF1KApiE6bRU&_nc_zt=23&_nc_ht=scontent.cdninstagram.com&_nc_gid=toyeBXarPTZN1BNKnwLrDQ&_nc_ss=7ba8c&oh=00_AQD-Mv58Fy6FSyAktYI2lHO39IjNAMhMDdQj5SxauDM25Q&oe=6A6FD87F",
    caption: "A fresh haircut transformation from KidSalonia's experienced stylists.",
    mediaType: "reel",
    service: "boys-haircut",
  },
  {
    postUrl: "https://www.instagram.com/kidsalonia/reel/Daz7TPypfsL/",
    thumbnailUrl:
      "https://scontent.cdninstagram.com/v/t51.82787-15/746854655_17891892996571576_8171737915035892908_n.jpg?stp=dst-jpg_e35_s640x640_tt6&_nc_cat=110&ccb=7-5&_nc_sid=18de74&efg=eyJlZmdfdGFnIjoiQ0xJUFMuYmVzdF9pbWFnZV91cmxnZW4uQzMifQ%3D%3D&_nc_ohc=MHAq-taasX8Q7kNvwE19mu9&_nc_oc=Adri8BYG05VRUaSGC1qki34sLA0zf8HDzRojtiTbesat3M7RG77HJivBvl1tspQgVgE&_nc_zt=23&_nc_ht=scontent.cdninstagram.com&_nc_gid=toyeBXarPTZN1BNKnwLrDQ&_nc_ss=7ba8c&oh=00_AQB8i2d-f7lIcprU7o3Rc8SgqMGCR1jDb56BLs92sIcYzw&oe=6A700565",
    caption: "Behind-the-scenes fun from a comfortable, colourful kids salon visit.",
    mediaType: "reel",
    service: "girls-haircut",
  },
];
