import React, {useState} from 'react';
import {Download, X} from 'lucide-react';
import {usePWAInstall} from '../hooks/usePWAInstall';

export const PWAInstallButton: React.FC = () => {
  const {isInstallable, isInstalled, isIOS, install} = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  if (isInstalled) {
    return null;
  }

  if (isInstallable) {
    return (
      <button
        type="button"
        onClick={install}
        aria-label="Pasang Aplikasi"
        className="flex items-center justify-center gap-2 min-w-[80px] min-h-[60px] sm:min-h-[72px] px-4 rounded-2xl bg-[#0EA5E9] text-white font-bold text-sm sm:text-base border-3 border-[#2D2424] border-b-[6px] active:border-b-3 active:translate-y-[3px] transition-transform cursor-pointer whitespace-nowrap shrink-0"
      >
        <Download className="w-6 h-6 shrink-0" strokeWidth={2.75} />
        <span>Pasang App</span>
      </button>
    );
  }

  if (isIOS) {
    return (
      <>
        <button
          type="button"
          onClick={() => setShowIOSGuide(true)}
          aria-label="Cara Pasang di iOS"
          className="flex items-center justify-center gap-2 min-w-[80px] min-h-[60px] sm:min-h-[72px] px-4 rounded-2xl bg-[#0EA5E9] text-white font-bold text-sm sm:text-base border-3 border-[#2D2424] border-b-[6px] active:border-b-3 active:translate-y-[3px] transition-transform cursor-pointer whitespace-nowrap shrink-0"
        >
          <Download className="w-6 h-6 shrink-0" strokeWidth={2.75} />
          <span>Pasang</span>
        </button>

        {showIOSGuide && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="w-full max-w-md rounded-3xl bg-[#FFFBF0] border-4 border-[#2D2424] p-6 shadow-2xl">
              <div className="flex items-center justify-between gap-4">
                <h3 className="text-xl font-bold text-[#2D2424]">
                  Pasang Puzzle Ceria
                </h3>
                <button
                  type="button"
                  onClick={() => setShowIOSGuide(false)}
                  aria-label="Tutup"
                  className="w-12 h-12 rounded-2xl bg-white border-3 border-[#2D2424] flex items-center justify-center text-[#2D2424] cursor-pointer"
                >
                  <X className="w-6 h-6" strokeWidth={2.75} />
                </button>
              </div>
              <p className="mt-3 text-base font-medium text-[#4A3E3E] leading-relaxed">
                1. Ketuk tombol <strong>Bagikan</strong> di Safari.
                <br />
                2. Pilih <strong>Tambah ke Layar Utama</strong> agar bisa dimainkan offline.
              </p>
              <button
                type="button"
                onClick={() => setShowIOSGuide(false)}
                className="mt-5 w-full min-h-[56px] rounded-2xl bg-[#FF6B4A] text-white font-bold text-lg border-3 border-[#2D2424] border-b-[6px] active:border-b-3 active:translate-y-[3px] cursor-pointer"
              >
                Mengerti
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  return null;
};
