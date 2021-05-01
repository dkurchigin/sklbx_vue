<template>
  <div>
    <div><h3 style="text-align: center;">{{ title }}</h3></div>
    <br>
    <br>
    <div class="preloader-1">
      <svg>
        <g>
          <path d="M 50,100 A 1,1 0 0 1 50,0"/>
        </g>
        <g>
          <path d="M 50,75 A 1,1 0 0 0 50,-25"/>
        </g>
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style="stop-color:#9eff00;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#000;stop-opacity:1" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PreUploader',
  props: {
    title: {
      type: String,
      default: 'Идёт загрузка товаров...',
    },
  },
};
</script>

<style>
.preloader-1 {
  text-align: center;
}
.preloader-1 svg {
  overflow: visible;
  width: 100px;
  height: 150px;
}
.preloader-1 svg g {
  animation: preloader-1-slide 2s linear infinite;
}
.preloader-1 svg g:nth-child(2) {
  animation-delay: 0.5s;
}
.preloader-1 svg g:nth-child(2) path {
  animation-delay: 0.5s;
  stroke-dasharray: 0px 158px;
  stroke-dashoffset: 1px;
}
.preloader-1 svg path {
  stroke: url(#gradient);
  stroke-width: 20px;
  stroke-linecap: round;
  fill: none;
  stroke-dasharray: 0 157px;
  stroke-dashoffset: 0;
  animation: preloader-1-escalade 2s cubic-bezier(0.8, 0, 0.2, 1) infinite;
}
@keyframes preloader-1-slide {
  0% {
    transform: translateY(-50px);
  }
  100% {
    transform: translateY(50px);
  }
}
@keyframes preloader-1-escalade {
  0% {
    stroke-dasharray: 0 157px;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 156px 157px;
    stroke-dashoffset: 0;
  }
  100% {
    stroke-dasharray: 156px 157px;
    stroke-dashoffset: -156px;
  }
}
</style>
