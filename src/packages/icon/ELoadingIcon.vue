<template>
    <div class="loader">
        <svg class="circular" viewBox="25 25 50 50">
            <circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10"></circle>
        </svg>
    </div>
</template>

<style lang="scss" scoped>
.e-loading-icon {
    width: 60rpx;
    height: 60rpx;
    border-radius: 50%;
    border: solid 2px red;
    border-right: solid 2px transparent;
}
.loader {
    position: relative;
    margin: 0 auto;
    width: 50px;
  &::before {
    content: "";
    display: block;
    padding-top: 100%;
  }  
}

.circular {
    -webkit-animation: rotate 2s linear infinite;
    animation: rotate 2s linear infinite;
    height: 100%;
    transform-origin: center center;
    width: 100%;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
}
.path {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
    -webkit-animation: dash 1.5s ease-in-out infinite, color 6s ease-in-out infinite;
    animation: dash 1.5s ease-in-out infinite, color 6s ease-in-out infinite;
    stroke-linecap: round;
    stroke: #000;
}

@keyframes dash {
0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
}
50% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -35px;
}
100% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -124px;
}
}

@keyframes rotate {
    100% {
    transform: rotate(360deg);
}
}
</style>