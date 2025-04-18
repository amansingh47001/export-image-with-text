// import Image from "next/image";

// export default function Home() {
//   return (
//     <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
//       <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
//         <Image
//           className="dark:invert"
//           src="/next.svg"
//           alt="Next.js logo"
//           width={180}
//           height={38}
//           priority
//         />
//         <ol className="list-inside list-decimal text-sm/6 text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
//           <li className="mb-2 tracking-[-.01em]">
//             Get started by editing{" "}
//             <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-[family-name:var(--font-geist-mono)] font-semibold">
//               app/page.tsx
//             </code>
//             .
//           </li>
//           <li className="tracking-[-.01em]">
//             Save and see your changes instantly.
//           </li>
//         </ol>

//         <div className="flex gap-4 items-center flex-col sm:flex-row">
//           <a
//             className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
//             href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             <Image
//               className="dark:invert"
//               src="/vercel.svg"
//               alt="Vercel logomark"
//               width={20}
//               height={20}
//             />
//             Deploy now
//           </a>
//           <a
//             className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
//             href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Read our docs
//           </a>
//         </div>
//       </main>
//       <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
//         <a
//           className="flex items-center gap-2 hover:underline hover:underline-offset-4"
//           href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <Image
//             aria-hidden
//             src="/file.svg"
//             alt="File icon"
//             width={16}
//             height={16}
//           />
//           Learn
//         </a>
//         <a
//           className="flex items-center gap-2 hover:underline hover:underline-offset-4"
//           href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <Image
//             aria-hidden
//             src="/window.svg"
//             alt="Window icon"
//             width={16}
//             height={16}
//           />
//           Examples
//         </a>
//         <a
//           className="flex items-center gap-2 hover:underline hover:underline-offset-4"
//           href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <Image
//             aria-hidden
//             src="/globe.svg"
//             alt="Globe icon"
//             width={16}
//             height={16}
//           />
//           Go to nextjs.org →
//         </a>
//       </footer>
//     </div>
//   );
// }
'use client';

import { useEffect, useRef, useState } from 'react';

const demoData = [
  {
    image: 'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d',
    text: 'Beautiful Mountain',
  },
  {
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
    text: 'Calm Lake',
  },
];

export default function ImageOverlayPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    const drawImageWithText = async () => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext('2d');
      if (!canvas || !ctx) return;

      const { image, text } = demoData[selectedIndex];
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = image;

      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;

        ctx.drawImage(img, 0, 0);
        ctx.font = 'bold 48px Inter, sans-serif';
        ctx.fillStyle = 'white';
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 2;
        ctx.textAlign = 'center';

        const x = canvas.width / 2;
        const y = canvas.height - 50;

        ctx.strokeText(text, x, y);
        ctx.fillText(text, x, y);
      };
    };

    drawImageWithText();
  }, [selectedIndex]);

  const downloadImage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement('a');
    link.download = 'image-with-text.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  return (
    <div className="flex flex-col items-center p-4 gap-4">
      <div className="flex gap-2">
        {demoData.map((_, i) => (
          <button
            key={i}
            onClick={() => setSelectedIndex(i)}
            className={`px-4 py-2 rounded ${
              i === selectedIndex ? 'bg-blue-600 text-white' : 'bg-gray-300'
            }`}
          >
            Image {i + 1}
          </button>
        ))}
      </div>

      <canvas ref={canvasRef} className="border max-w-full" />

      <button
        onClick={downloadImage}
        className="mt-4 px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        Download Image with Text
      </button>
    </div>
  );
}
