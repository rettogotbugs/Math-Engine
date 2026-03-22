import React, { useRef } from 'react';
import { Download } from 'lucide-react';
import { toPng } from 'html-to-image';

interface ChartWrapperProps {
  children: React.ReactNode;
}

export function ChartWrapper({ children }: ChartWrapperProps) {
  const chartRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (chartRef.current) {
      try {
        const dataUrl = await toPng(chartRef.current, { cacheBust: true, backgroundColor: '#18181b' });
        const link = document.createElement('a');
        link.download = 'chart.png';
        link.href = dataUrl;
        link.click();
      } catch (err) {
        console.error('Failed to download image', err);
      }
    }
  };

  return (
    <div className="relative w-full flex flex-col items-center">
      <button
        onClick={handleDownload}
        className="absolute top-0 right-0 z-10 flex items-center gap-2 rounded-lg bg-indigo-500/20 px-3 py-1.5 text-xs font-medium text-indigo-300 transition-colors hover:bg-indigo-500/30 hover:text-indigo-200"
      >
        <Download className="h-4 w-4" />
        Export Chart
      </button>
      <div ref={chartRef} className="w-full flex justify-center pt-10 pb-4">
        {children}
      </div>
    </div>
  );
}
