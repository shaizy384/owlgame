import React, { useRef, useEffect, useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import NavigateBtns from './components/NavigateBtns';
import owl from './assets/svgs/owl.svg';
import eye from './assets/svgs/eye.svg';
import ant from './assets/svgs/ant.svg';
import beetle from './assets/svgs/beetle.svg';
import wasp from './assets/svgs/wasp.svg';
import poof from './assets/images/poof.gif';
import InsectSelection from './components/InsectSelection';

function App() {
  const [cursorStyle, setCursorStyle] = useState({ cursor: 'auto' })
  const [isInsect, setIsInsect] = useState(false)
  const smokeRef = useRef();
  const leftEyeRef = useRef(null);
  const rightEyeRef = useRef(null);
  const owlRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isInsect) return;
      const { clientX, clientY } = e;
      const owlRect = owlRef.current.getBoundingClientRect();

      // Calculate the center of the owl's eyes
      const leftEyeCenter = {
        x: owlRect.left + 69 + 40,
        y: owlRect.top + owlRect.height * 0.47,
      };

      // Function to calculate the new position for the eyes
      const calculatePosition = (eyeCenter) => {
        const dx = clientX - eyeCenter.x;
        const dy = clientY - eyeCenter.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = 20; // Maximum distance the eye can move

        if (distance > maxDistance) {
          const angle = Math.atan2(dy, dx);
          return {
            x: maxDistance * Math.cos(angle),
            y: maxDistance * Math.sin(angle),
          };
        }
        return { x: dx, y: dy };
      };

      // Set the position of the left eye
      const leftEyePosition = calculatePosition(leftEyeCenter);
      if (leftEyeRef.current) {
        leftEyeRef.current.style.transform = `translate(${leftEyePosition.x}px, ${leftEyePosition.y}px)`;
      }

      // Set the position of the right eye opposite to the left eye
      const rightEyePosition = { x: leftEyePosition.x, y: leftEyePosition.y };
      if (rightEyeRef.current) {
        rightEyeRef.current.style.transform = `translate(${rightEyePosition.x}px, ${rightEyePosition.y}px)`;
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isInsect]);

  useEffect(() => {
    if (!isInsect) {
      rightEyeRef.current.style.transform = `translate(0, 0)`;
      leftEyeRef.current.style.transform = `translate(0, 0)`;
    }
  }, [isInsect])

  const hidePoof = () => {
    smokeRef.current.style.display === "none" ?
      smokeRef.current.style.display = "block" :
      smokeRef.current.style.display = "none"
  }

  const handleMouseEnter = () => {
    if (!isInsect) return;
    setCursorStyle({ cursor: 'auto' })
    smokeRef.current.style.display = "block"
    setTimeout(hidePoof, 550)
    setIsInsect(false)
  }

  const insects = [
    {
      name: "Beetle",
      image: beetle,
    },
    {
      name: "Ant",
      image: ant,
    },
    {
      name: "Wasp",
      image: wasp,
    },
  ];

  return (
    <div className="h-[808px] bg-white flex justify-center items-center" style={cursorStyle}>
      <main className='mx-auto relative flex flex-col'>
        <Navbar />
        <div className='flex justify-center gap-8 mt-3'>
          {insects?.map((insect, index) => {
            const { image, name } = insect;
            return <InsectSelection key={index} image={image} name={name} setCursorStyle={setCursorStyle} setIsInsect={setIsInsect} />;
          })}
        </div>
        <div ref={owlRef} className="owl grow flex justify-center items-center relative w-fit mx-auto">
          <img src={owl} alt="owl" className='w-[300px]' />
          <div className='owl-mouth absolute h-[70px] w-[74px] top-[57%] z-50' onMouseEnter={handleMouseEnter}>

          </div>
          <img ref={smokeRef} src={poof} className={`hidden smoke absolute h-[50px] w-[67px] top-[59%] left-[40%] z-[500] `} alt="" />
          <div ref={leftEyeRef} className="eye w-[80px] h-[80px] flex items-center justify-center left-[69px] top-[47%] absolute">
            <img src={eye} alt="eye" className='w-[45px]' />
          </div>
          <div ref={rightEyeRef} className="eye w-[80px] h-[80px] flex items-center justify-center left-[172px] top-[46%] absolute">
            <img src={eye} alt="eye" className='w-[45px]' />
          </div>
        </div>
        <div className="flex justify-between w-full px-20 mx-auto bottom-7 absolut">
          <NavigateBtns text="Back" />
          <NavigateBtns text="Next" />
        </div>
      </main>
    </div>
  );
}

export default App;
