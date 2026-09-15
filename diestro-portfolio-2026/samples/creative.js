let tween = gsap.timeline();

window.creativeTimeline = tween;

// INITIAL STATES
tween.set("#image1", { opacity: 1 });
tween.set("#image2, #image3, #image4, #image5", { opacity: 0 });
tween.set("#frame1headline, #frame2headline, #frame3headline, #frame4headline, #frame5headline", { opacity: 0, y: 10 });

tween
.to("#frame1headline", 0.6, { opacity: 1, y: 0, ease: "power3.out" }, "+=0.4")
.to("#image1, #frame1headline", 0.8, { opacity: 0, ease: "power2.inOut" }, "+=1")
.to("#image2", 0.8, { opacity: 1, ease: "power2.inOut" }, "-=0.7")
.to("#frame2headline", 0.6, { opacity: 1, y: 0, ease: "power3.out" }, "<+=0.4")
.to("#image2, #frame2headline", 0.8, { opacity: 0, ease: "power2.inOut" }, "+=1")
.to("#image3", 0.8, { opacity: 1, ease: "power2.inOut" }, "-=0.7")
.to("#frame3headline", 0.6, { opacity: 1, y: 0, ease: "power3.out" }, "<+=0.4")
.to("#image3, #frame3headline", 0.8, { opacity: 0, ease: "power2.inOut" }, "+=1")
.to("#image4", 0.8, { opacity: 1, ease: "power2.inOut" }, "-=0.7")
.to("#frame4headline", 0.6, { opacity: 1, y: 0, ease: "power3.out" }, "<+=0.4")
.to("#image4, #frame4headline", 0.8, { opacity: 0, ease: "power2.inOut" }, "+=1")
.to("#image5", 0.8, { opacity: 1, ease: "power2.inOut" }, "-=0.7")
.to("#frame5headline", 0.6, { opacity: 1, y: 0, ease: "power3.out" }, "<+=0.4");