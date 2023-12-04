import React, { useEffect, useRef } from "react";

interface IProps {
  children: React.ReactElement;
}

const DraggableDiv = ({ children }: IProps) => {
  //
  const rootRef = useRef<HTMLDivElement>(null);

  const dragZoneRef = useRef<HTMLElement | null>(null);

  const initialOffset = useRef<number>(0);

  useEffect(() => {
    const rootEl = rootRef.current;
    if (!rootEl) return;
    const target = rootEl.querySelector("#dragZone") as HTMLElement;
    dragZoneRef.current = target;
  }, [rootRef]);

  const startDragging = (event: MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();

    const rootEl = rootRef.current;
    if (rootEl)
      initialOffset.current =
        event.clientX - rootEl.getBoundingClientRect().left;

    document.addEventListener("mouseup", stopDragging);
    document.addEventListener("mousemove", onDragging);

    document.body.style.cursor = "move";
  };

  const stopDragging = () => {
    document.removeEventListener("mousemove", onDragging);
    document.removeEventListener("mouseup", stopDragging);

    document.body.style.cursor = "default";
  };

  const onDragging = (event: MouseEvent) => {
    //
    event.preventDefault();
    const rootEl = rootRef.current;
    if (!rootEl) return;
    const { clientX, clientY } = event;
    const { width } = rootEl.getBoundingClientRect();
    const maxLeftOffset = window.innerWidth - width;

    let positionX = clientX - initialOffset.current;
    let positionY = clientY;

    if (positionX < 0) positionX = 0;
    if (positionX > maxLeftOffset) positionX = maxLeftOffset;

    if (positionY < 0) positionY = 0;

    rootEl.style.transform = `translate(${positionX}px,${positionY}px)`;
  };

  useEffect(() => {
    const dragZoneEl = dragZoneRef.current;
    if (!dragZoneEl) return;

    dragZoneEl.addEventListener("mousedown", startDragging);

    return () => dragZoneEl.removeEventListener("mousedown", startDragging);
  }, [dragZoneRef]);

  return (
    <div ref={rootRef} className="border absolute">
      {children}
    </div>
  );
};

export default DraggableDiv;
