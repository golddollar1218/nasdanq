(function () {
  var cab = document.getElementById("cabtn");
  if (cab) {
    cab.addEventListener("click", function () {
      var ca = cab.getAttribute("data-ca");
      if (!ca || ca === "0xd6319a9dfe81251fe3d5bfb3977dc5be25402145") {
        cab.textContent = "Coming soon";
        setTimeout(function () {
          cab.textContent = ca || "0xd6319a9dfe81251fe3d5bfb3977dc5be25402145";
        }, 1200);
        return;
      }
      function flash() {
        var t = cab.textContent;
        cab.textContent = "Copied ✓";
        setTimeout(function () {
          cab.textContent = t;
        }, 1200);
      }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(ca).then(flash);
      } else {
        var ta = document.createElement("textarea");
        ta.value = ca;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
        flash();
      }
    });
  }

  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && reveals.length) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -40px 0px" }
    );
    reveals.forEach(function (el) {
      io.observe(el);
    });
  } else {
    reveals.forEach(function (el) {
      el.classList.add("in");
    });
  }

  var canvas = document.getElementById("stars");
  if (canvas && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    var c = canvas.getContext("2d");
    var particles = [];
    var w = 0;
    var h = 0;
    var raf = 0;

    function resize() {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      var count = Math.min(70, Math.floor((w * h) / 28000));
      particles = [];
      for (var i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          r: Math.random() * 1.6 + 0.3,
          vy: -(Math.random() * 0.18 + 0.04),
          vx: (Math.random() - 0.5) * 0.08,
          a: Math.random() * 0.55 + 0.2,
          hue: Math.random() > 0.85 ? "green" : Math.random() > 0.7 ? "blue" : "white",
        });
      }
    }

    function tick() {
      c.clearRect(0, 0, w, h);
      for (var i = 0; i < particles.length; i++) {
        var p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        if (p.y < -10) {
          p.y = h + 10;
          p.x = Math.random() * w;
        }
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;
        c.beginPath();
        if (p.hue === "green") {
          c.fillStyle = "rgba(57,255,20," + p.a + ")";
        } else if (p.hue === "blue") {
          c.fillStyle = "rgba(78,195,255," + p.a + ")";
        } else {
          c.fillStyle = "rgba(255,255,255," + p.a + ")";
        }
        c.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        c.fill();
      }
      raf = requestAnimationFrame(tick);
    }

    resize();
    tick();
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", function () {
      if (document.hidden) {
        cancelAnimationFrame(raf);
      } else {
        tick();
      }
    });
  }
})();
