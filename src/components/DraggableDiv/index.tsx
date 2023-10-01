import React, { useEffect, useRef } from "react";

interface IProps {
  children: React.ReactElement;
}

const DraggableDiv = ({ children }: IProps) => {
  //
  const rootRef = useRef<HTMLDivElement>(null);

  const dragZoneRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const rootEl = rootRef.current
    if(!rootEl) return;
    const target = rootEl.querySelector("#dragZone") as HTMLElement;
    dragZoneRef.current = target;
  }, [rootRef]);

  const startDragging = (event: MouseEvent) => {
    event.preventDefault();
    event.stopPropagation()

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
    const rootEl = rootRef.current
    if (!rootEl) return;
    const { clientX, clientY } = event;
    const { width, height } = rootEl.getBoundingClientRect();

    let positionX = clientX - width / 2
    let positionY = clientY - height / 2;

    if (clientX < 0) positionX = 0;
    else rootEl.style.left = positionX + "px";

    if (clientY < 0) positionY = 0;
    else rootEl.style.top = positionY + "px";

  };

  useEffect(() => {
    const dragZoneEl = dragZoneRef.current
    if (!dragZoneEl) return;

    dragZoneEl.addEventListener("mousedown", startDragging);

    return () => dragZoneEl.removeEventListener("mousedown", startDragging);
  }, [dragZoneRef]);

  return (
    <div
      ref={rootRef}
      className="border absolute w-1/3 h-[400px] m-auto mt-[200px]"
    >
      {children}
    </div>
  );
};

export default DraggableDiv;
