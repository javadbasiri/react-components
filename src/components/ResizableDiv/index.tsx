import { useRef, useCallback } from 'react';

interface IProps {
    minHeight: number;
    maxHeight?: number;
    children: JSX.Element;
}

const ResizableDiv = ({ children, maxHeight, minHeight }: IProps) => {
    //
    const rootDivRef = useRef<HTMLDivElement>(null);

    const resize = (event: globalThis.MouseEvent) => {
        const resizableDiv = rootDivRef.current;
        if (!resizableDiv) return;
        resizableDiv.style.height = `${event.clientY - resizableDiv.getBoundingClientRect().top}px`;
    };

    const initResize = () => {
        document.addEventListener('mousemove', resize);
        document.addEventListener('mouseup', stopResize);
    };

    const stopResize = () => {
        document.removeEventListener('mousemove', resize);
    };

    const onResizerRefLoad = useCallback((element: HTMLDivElement) => {
        //
        if (!element) return;
        const elementOffset = element.getBoundingClientRect();

        element.style.left = `calc(50% - ${elementOffset.width / 2 + 'px'})`;
        element.style.bottom = `-${elementOffset.height / 2}px`;
    }, []);

    return (
        <div style={{ minHeight, maxHeight }} className="relative" ref={rootDivRef}>
            <div className="h-full">{children}</div>
            <div ref={onResizerRefLoad} onMouseDown={initResize} className="absolute cursor-n-resize">
                <DotSVG />
            </div>
        </div>
    );
};

export default ResizableDiv;

const DotSVG = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 34 34" fill="none">
        <g clipPath="url(#clip0_426_71656)">
            <path
                d="M7.08073 18.4173C7.86313 18.4173 8.4974 17.7831 8.4974 17.0007C8.4974 16.2182 7.86313 15.584 7.08073 15.584C6.29833 15.584 5.66406 16.2182 5.66406 17.0007C5.66406 17.7831 6.29833 18.4173 7.08073 18.4173Z"
                fill="#5E6781"
                stroke="#5E6781"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M17.0026 18.4173C17.785 18.4173 18.4193 17.7831 18.4193 17.0007C18.4193 16.2182 17.785 15.584 17.0026 15.584C16.2202 15.584 15.5859 16.2182 15.5859 17.0007C15.5859 17.7831 16.2202 18.4173 17.0026 18.4173Z"
                fill="#5E6781"
                stroke="#5E6781"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M26.9167 18.4173C27.6991 18.4173 28.3333 17.7831 28.3333 17.0007C28.3333 16.2182 27.6991 15.584 26.9167 15.584C26.1343 15.584 25.5 16.2182 25.5 17.0007C25.5 17.7831 26.1343 18.4173 26.9167 18.4173Z"
                fill="#5E6781"
                stroke="#5E6781"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </g>
        <defs>
            <clipPath id="clip0_426_71656">
                <rect width="34" height="34" fill="red" />
            </clipPath>
        </defs>
    </svg>
);
