'use client';

import { Fade } from 'react-slideshow-image';
import Image from 'next/image';

import 'react-slideshow-image/dist/styles.css';

const fadeImages = [
  {
    url: 'https://images.unsplash.com/photo-1509721434272-b79147e0e708?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80',
    caption: 'First Slide'
  },
  {
    url: 'https://images.unsplash.com/photo-1506710507565-203b9f24669b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1536&q=80',
    caption: 'Second Slide'
  },
  {
    url: 'https://images.unsplash.com/photo-1536987333706-fc9adfb10d91?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80',
    caption: 'Third Slide'
  }
];

export const Slider = () => {
  return (
    <div className="w-full sm:w-3/4 lg:w-1/2 mx-auto mt-4 rounded-md p-1 border">
      <Fade arrows={true} duration={2000} transitionDuration={1000} infinite={true}>
        {fadeImages.map((fadeImage, index) => (
          <div key={index} className="aspect-[16/9]">
            <Image className="object-cover" src={fadeImage.url} fill alt={fadeImage.caption} />
          </div>
        ))}
      </Fade>
    </div>
  );
};
