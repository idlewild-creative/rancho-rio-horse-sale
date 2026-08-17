(function () {
  var chart = document.getElementById("growthChart");
  if (!chart) return;

  var data = [
    { year: 2015, annual: 0.40, est: true },
    { year: 2016, annual: 0.60, est: true },
    { year: 2017, annual: 0.70, est: true },
    { year: 2018, annual: 0.70, est: true },
    { year: 2019, annual: 1.20, est: true },
    { year: 2020, annual: 1.30, est: false },
    { year: 2021, annual: 2.50, est: false },
    { year: 2022, annual: 2.30, est: false },
    { year: 2023, annual: 2.39, est: false },
    { year: 2024, annual: 2.66, est: false },
    { year: 2025, annual: 2.95, est: false },
    { year: 2026, annual: 2.77, est: false }
  ];

  var cum = 0;
  data.forEach(function (d) {
    cum += d.annual;
    d.cum = Math.round(cum * 100) / 100;
  });
  var total = data[data.length - 1].cum;

  var svg = document.getElementById("growthSvg");
  var gridG = document.getElementById("growthGrid");
  var areaPath = document.getElementById("growthArea");
  var linePath = document.getElementById("growthLine");
  var dot = document.getElementById("growthDot");
  var endLabel = document.getElementById("growthEndLabel");
  var axisG = document.getElementById("growthAxis");
  var totalEl = document.getElementById("growthTotal");
  var wrap = chart.querySelector(".growth-chart-svg-wrap");
  var crosshair = document.getElementById("growthCrosshair");
  var tooltip = document.getElementById("growthTooltip");

  var W = 1000, H = 340, padL = 8, padR = 8, padT = 20, padB = 36;
  var innerW = W - padL - padR, innerH = H - padT - padB;
  var n = data.length;
  var maxY = Math.ceil(total / 5) * 5;

  function xFor(i) { return padL + (innerW * i) / (n - 1); }
  function yFor(v) { return padT + innerH * (1 - v / maxY); }

  function fmtM(v) { return "$" + v.toFixed(v < 10 ? 2 : 1).replace(/\.00$/, "") + "M"; }

  // Gridlines + y labels (0, 1/4, 1/2, 3/4, max)
  var steps = 4;
  var gridSVG = "";
  for (var s = 0; s <= steps; s++) {
    var val = (maxY / steps) * s;
    var y = yFor(val);
    gridSVG += '<line class="growth-chart-grid" x1="' + padL + '" y1="' + y + '" x2="' + (W - padR) + '" y2="' + y + '"></line>';
    gridSVG += '<text class="y-tick" x="' + padL + '" y="' + (y - 6) + '" font-size="10">$' + val.toFixed(0) + 'M</text>';
  }
  gridG.innerHTML = gridSVG;

  // Line + area paths
  var linePts = data.map(function (d, i) { return xFor(i) + "," + yFor(d.cum); });
  var lineD = "M" + linePts.join(" L");
  var areaD = "M" + xFor(0) + "," + yFor(0) + " L" + linePts.join(" L") + " L" + xFor(n - 1) + "," + yFor(0) + " Z";
  linePath.setAttribute("d", lineD);
  areaPath.setAttribute("d", areaD);

  // End dot + label
  var lastX = xFor(n - 1), lastY = yFor(total);
  dot.setAttribute("cx", lastX);
  dot.setAttribute("cy", lastY);
  endLabel.setAttribute("x", Math.min(lastX, W - 70));
  endLabel.setAttribute("y", lastY - 14);
  endLabel.textContent = fmtM(total);

  // X-axis year labels (every other year to avoid crowding)
  var axisSVG = "";
  data.forEach(function (d, i) {
    if (i % 2 === 0 || i === n - 1) {
      axisSVG += '<text x="' + xFor(i) + '" y="' + (H - padB + 18) + '" text-anchor="middle">' + d.year + "</text>";
    }
  });
  axisG.innerHTML = axisSVG;

  // Reveal + count-up animation
  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function animateCount(duration) {
    var start = null;
    function step(ts) {
      if (!start) start = ts;
      var p = Math.min(1, (ts - start) / duration);
      var eased = 1 - Math.pow(1 - p, 3);
      totalEl.textContent = fmtM(total * eased);
      if (p < 1) requestAnimationFrame(step);
      else totalEl.textContent = fmtM(total);
    }
    requestAnimationFrame(step);
  }

  function reveal() {
    chart.classList.add("is-visible");
    if (reduceMotion) {
      totalEl.textContent = fmtM(total);
    } else {
      animateCount(1100);
    }
  }

  if (reduceMotion) {
    reveal();
  } else if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            reveal();
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 }
    );
    io.observe(chart);
  } else {
    reveal();
  }

  // Hover crosshair + tooltip
  function pointFromEvent(evt) {
    var rect = wrap.getBoundingClientRect();
    var clientX = evt.touches ? evt.touches[0].clientX : evt.clientX;
    var relX = ((clientX - rect.left) / rect.width) * W;
    var i = Math.round(((relX - padL) / innerW) * (n - 1));
    i = Math.max(0, Math.min(n - 1, i));
    return i;
  }

  function showTooltip(i) {
    var d = data[i];
    var px = (xFor(i) / W) * 100;
    crosshair.style.left = px + "%";
    crosshair.style.opacity = "1";
    tooltip.style.left = px + "%";
    tooltip.style.top = (yFor(d.cum) / H) * 100 + "%";
    tooltip.style.opacity = "1";
    tooltip.innerHTML = "";
    var strong = document.createElement("strong");
    strong.textContent = fmtM(d.cum) + (d.est ? " (est.)" : "");
    var span = document.createElement("span");
    span.textContent = d.year + " — cumulative total";
    tooltip.appendChild(strong);
    tooltip.appendChild(span);
  }

  function hideTooltip() {
    crosshair.style.opacity = "0";
    tooltip.style.opacity = "0";
  }

  wrap.addEventListener("pointermove", function (evt) {
    showTooltip(pointFromEvent(evt));
  });
  wrap.addEventListener("pointerleave", hideTooltip);
})();
