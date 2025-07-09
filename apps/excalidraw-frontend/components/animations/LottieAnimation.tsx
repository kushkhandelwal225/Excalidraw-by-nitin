'use client'; // only needed if you're using App Router

import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const LottieAnimation = () => {
  return (
    <DotLottieReact
      src="https://lottie.host/fa0fd3a0-29f7-47d6-88c8-9a9f46f6ad71/dcWZBEHZQe.lottie"
      loop
      autoplay
    />
  );
};
export default LottieAnimation;