import React, { useEffect, useRef,useState } from 'react';
import './GraphComp.css'
function GraphComponent({ data,in_width,in_height,padding,cutoff,y_label }) {
  const canvasRef = useRef(null);
  const [clickedValue, setClickedValue] = useState(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    

    // Clear the canvas
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Set up the graph parameters
    const width = in_width;
    const height = in_height;
    const graphWidth = width - 2 * padding;
    const graphHeight = height - 2 * padding;

    // Determine the maximum and minimum values in the data
    const maxMoney = Math.max(...data.map((item) => item.y));
    const minMoney = Math.min(...data.map((item) => item.y));

    // Determine the earliest and latest dates in the data
    const minDate = new Date(Math.min(...data.map((item) => new Date(item.x))));
    const maxDate = new Date(Math.max(...data.map((item) => new Date(item.x))));

    // Calculate the horizontal and vertical scaling factors
    const xScale = graphWidth / (maxDate - minDate);
    const yScale = graphHeight / (maxMoney - minMoney);

    // Draw the horizontal gridlines and ticks
    const numHorizontalGridlines = 5;
    const yIncrement = graphHeight / numHorizontalGridlines;
    for (let i = 0; i < numHorizontalGridlines+1; i++) {
      const y = padding + i * yIncrement;
      context.beginPath();
      context.moveTo(padding, y);
      context.lineTo(width - padding, y);
      context.strokeStyle = '#ccc';
      context.lineWidth = 0.5;
      context.stroke();

      // Draw ticks
      context.beginPath();
      context.moveTo(padding - 5, y);
      context.lineTo(padding, y);
      context.strokeStyle = 'black';
      context.lineWidth = 1;
      context.stroke();

      // Draw tick values
      context.font = '15px sans-serif';
      context.fillStyle = 'black';
      context.textAlign = 'right';
      context.textBaseline = 'middle';
      const moneyValue = maxMoney - (i * (maxMoney - minMoney)) / numHorizontalGridlines;
      context.fillText(moneyValue.toFixed(2), padding - 10, y);
    }

    // Draw the vertical gridlines and ticks
    const numVerticalGridlines = data.length - 1;
    const xIncrement = graphWidth / numVerticalGridlines;
    for (let i = 0; i < numVerticalGridlines+1; i++) {
      const x = padding + i * xIncrement;
      context.beginPath();
      context.moveTo(x, padding);
      context.lineTo(x, height - padding);
      context.strokeStyle = '#ccc';
      context.lineWidth = 0.5;
      context.stroke();

      // Draw ticks
      context.beginPath();
      context.moveTo(x, height - padding);
      context.lineTo(x, height - padding + 5);
      context.strokeStyle = 'black';
      context.lineWidth = 1;
      context.stroke();
    }

    // Draw the x-axis labels
    context.font = '12px sans-serif';
    context.fillStyle = 'black';
    context.textAlign = 'center';
    context.textBaseline = 'top';
    for (let i = 0; i < data.length; i++,i++) {
      const x = padding + (new Date(data[i].x) - minDate) * xScale;
      const y = height - padding + 10;
      context.fillText(data[i].x, x, y);
    }

    // Draw the y-axis label\
    context.save();
    context.translate(10, height / 2);
    context.rotate(-Math.PI / 2);
    context.textAlign = 'center';
    context.font = '25px sans-serif';
    context.fillStyle = 'black';
    context.fillText(y_label, 0, -10);
    context.restore();

    //draw the X label
    context.font = '25px sans-serif';
    context.fillStyle = 'black';
    context.textAlign = 'center';
    context.fillText('Date', width / 2, height -40);

    // Draw the graph line
    context.setLineDash([])
    context.beginPath();
    context.moveTo(padding, height - padding - (data[0].y - minMoney) * yScale);
    for (let i = 1; i < data.length; i++) {
      const x = padding + (new Date(data[i].x) - minDate) * xScale;
      const y = height - padding - (data[i].y - minMoney) * yScale;
      if (new Date(data[i].x) > cutoff){
        context.strokeStyle = 'red';
      }else {
        context.strokeStyle = 'blue';
      }
      context.lineTo(x, y);
      context.lineWidth = 2;
        context.stroke();
        context.beginPath();
        context.moveTo(x,height - padding - (data[data.length-1].y - minMoney) * yScale);
        context.lineTo(x, y);
        context.lineWidth = 2;
        context.setLineDash([5,3])
        context.stroke();
        context.beginPath();
        context.setLineDash([])
        context.moveTo(x, y);
    }
    
    

    // Draw dots at data points
    for (let i = 0; i < data.length; i++) {
      const x = padding + (new Date(data[i].x) - minDate) * xScale;
      const y = height - padding - (data[i].y - minMoney) * yScale;
      context.beginPath();
      if (new Date(data[i].x) > cutoff){
        context.fillStyle = 'red';
        console.log("red")
      }else {
        context.fillStyle = 'blue';
        console.log("blue")
      }
      context.arc(x, y, 5, 0, 2 * Math.PI);
      context.fill();
    }
    // Event listener for mouse click
    canvas.addEventListener('click', handleClick);

    // Cleanup function to remove the event listener
    return () => {
      canvas.removeEventListener('click', handleClick);
    };
  }, [data]);

  // Handle mouse click and update clickedValue
  const handleClick = (event) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    // Check if click position is within the graph area
    const padding = 20;
    const width = canvas.width;
    const height = canvas.height;
    if (x >= padding && x <= width - padding && y >= padding && y <= height - padding) {
      const index = Math.floor((x - padding) / ((width - 2 * padding) / (data.length - 1)));
      const value = data[index].y;
      setClickedValue([data[index].x,value]);
    } else {
      setClickedValue(null);
    }
  };

  return (
    <div>
      <canvas ref={canvasRef} width={in_width} height={in_height} />
      {clickedValue !== null && (
        <div className='point'>
          ( {clickedValue[0]}, ${clickedValue[1]} )
        </div>
      )}
    </div>
  );
}

export default GraphComponent;
