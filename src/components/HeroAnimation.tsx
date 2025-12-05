'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function HeroAnimation() {
    const [showArt, setShowArt] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setShowArt((prev) => !prev);
        }, 4000); // Toggle every 4 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="absolute inset-0 z-0 flex items-center justify-center opacity-20 dark:opacity-10 pointer-events-none">
            <div className="relative w-full h-full max-w-4xl max-h-[80vh]">
                {/* Sketch Layer */}
                <div
                    className={`absolute inset-0 transition-opacity duration-[2000ms] ease-in-out ${showArt ? 'opacity-0' : 'opacity-100'
                        }`}
                >
                    <Image
                        src="/images/picasso-sketch.png"
                        alt="Picasso Sketch"
                        fill
                        className="object-contain"
                        priority
                    />
                </div>

                {/* Art Layer */}
                <div
                    className={`absolute inset-0 transition-opacity duration-[2000ms] ease-in-out ${showArt ? 'opacity-100' : 'opacity-0'
                        }`}
                >
                    <Image
                        src="/images/picasso-art.png"
                        alt="Picasso Art"
                        fill
                        className="object-contain"
                        priority
                    />
                </div>
            </div>
        </div>
    );
}
