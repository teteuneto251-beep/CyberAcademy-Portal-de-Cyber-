import React, { useState } from 'react';
import {
  Download,
  Smartphone,
  CheckCircle2,
  X,
  Share,
  PlusSquare,
  Sparkles,
  Shield,
  Laptop
} from 'lucide-react';
import { usePWAInstall } from '../../hooks/usePWAInstall';

interface PWAInstallButtonProps {
  variant?: 'header' | 'sidebar' | 'banner';
  isLightMode?: boolean;
}

export const PWAInstallButton: React.FC<PWAInstallButtonProps> = ({
  variant = 'header',
  isLightMode = false
}) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSModal, setShowIOSModal] = useState(false);
  const [showGeneralGuide, setShowGeneralGuide] = useState(false);

  // If already installed in standalone mode, show clean installed state or nothing
  if (isInstalled) {
    if (variant === 'sidebar') {
      return (
        <div
          className={`px-3 py-2 rounded-xl text-xs flex items-center justify-between border ${
            isLightMode
              ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
              : 'bg-emerald-950/40 text-emerald-300 border-emerald-500/30'
          }`}
        >
          <span className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span className="font-semibold">App Instalado</span>
          </span>
          <span className="text-[10px] font-mono uppercase text-emerald-600 dark:text-emerald-400">Ativo</span>
        </div>
      );
    }
    return null;
  }

  const handleInstallClick = async () => {
    if (isInstallable) {
      await install();
    } else if (isIOS) {
      setShowIOSModal(true);
    } else {
      setShowGeneralGuide(true);
    }
  };

  // Header Variant (Compact button for top navigation)
  if (variant === 'header') {
    return (
      <>
        <button
          onClick={handleInstallClick}
          className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white font-semibold text-xs shadow-md shadow-cyan-600/20 transition flex items-center gap-1.5 cursor-pointer hover:scale-105 active:scale-95"
          title="Instalar como aplicativo no Celular ou Computador"
        >
          <Download className="w-3.5 h-3.5" />
          <span className="font-bold">Instalar App</span>
        </button>

        {/* iOS Modal */}
        {showIOSModal && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div
              className={`max-w-md w-full rounded-3xl p-6 border shadow-2xl relative animate-fadeIn ${
                isLightMode ? 'bg-white text-slate-800 border-slate-200' : 'bg-slate-900 text-white border-cyan-500/30'
              }`}
            >
              <button
                onClick={() => setShowIOSModal(false)}
                className="absolute top-4 right-4 p-1.5 rounded-xl border border-slate-700/40 text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-lg">
                  <Smartphone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-base sm:text-lg">Instalar no iPhone / iPad</h3>
                  <p className="text-xs text-slate-400 font-mono">PWA Oficial · Standalone</p>
                </div>
              </div>

              <div className="space-y-3 text-xs leading-relaxed">
                <div className={`p-3 rounded-xl border flex items-start gap-2.5 ${isLightMode ? 'bg-slate-50 border-slate-200' : 'bg-slate-850 border-slate-800'}`}>
                  <Share className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                  <div>
                    <strong>1. Toque em Compartilhar:</strong> No Safari do iPhone/iPad, toque no botão de compartilhar (o quadrado com uma seta para cima na barra inferior).
                  </div>
                </div>

                <div className={`p-3 rounded-xl border flex items-start gap-2.5 ${isLightMode ? 'bg-slate-50 border-slate-200' : 'bg-slate-850 border-slate-800'}`}>
                  <PlusSquare className="w-4 h-4 text-cyan-500 shrink-0 mt-0.5" />
                  <div>
                    <strong>2. Adicionar à Tela de Início:</strong> Role o menu para baixo e toque em <em>&ldquo;Adicionar à Tela de Início&rdquo;</em>.
                  </div>
                </div>

                <div className={`p-3 rounded-xl border flex items-start gap-2.5 ${isLightMode ? 'bg-slate-50 border-slate-200' : 'bg-slate-850 border-slate-800'}`}>
                  <Sparkles className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <strong>3. Confirmar:</strong> Toque em <em>&ldquo;Adicionar&rdquo;</em> no canto superior direito. O ícone aparecerá como aplicativo nativo na sua tela principal!
                  </div>
                </div>
              </div>

              <button
                onClick={() => setShowIOSModal(false)}
                className="mt-5 w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition cursor-pointer"
              >
                Entendido
              </button>
            </div>
          </div>
        )}

        {/* General Guide Modal (for desktop Chrome/Edge or Android if prompt isn't fired yet) */}
        {showGeneralGuide && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div
              className={`max-w-md w-full rounded-3xl p-6 border shadow-2xl relative animate-fadeIn ${
                isLightMode ? 'bg-white text-slate-800 border-slate-200' : 'bg-slate-900 text-white border-cyan-500/30'
              }`}
            >
              <button
                onClick={() => setShowGeneralGuide(false)}
                className="absolute top-4 right-4 p-1.5 rounded-xl border border-slate-700/40 text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-500 via-blue-600 to-indigo-700 flex items-center justify-center text-white shadow-lg">
                  <Laptop className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-base sm:text-lg">Instalar no Celular ou PC</h3>
                  <p className="text-xs text-slate-400 font-mono">Aplicativo Web Progressivo (PWA)</p>
                </div>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                Instale este portal para acessá-lo como um aplicativo nativo em tela inteira, sem barras do navegador, com carregamento ultrarrápido e recursos offline:
              </p>

              <div className="space-y-3 text-xs leading-relaxed">
                <div className={`p-3 rounded-xl border flex items-start gap-2.5 ${isLightMode ? 'bg-slate-50 border-slate-200' : 'bg-slate-850 border-slate-800'}`}>
                  <Download className="w-4 h-4 text-cyan-500 shrink-0 mt-0.5" />
                  <div>
                    <strong>No Chrome / Edge (Computador):</strong> Clique no ícone de instalação <span className="font-mono bg-slate-800 text-cyan-300 px-1.5 py-0.5 rounded">⊕</span> na barra de endereços do navegador (ao lado da estrela de favoritos) ou no menu de 3 pontos ➔ <em>&ldquo;Instalar Aplicativo&rdquo;</em>.
                  </div>
                </div>

                <div className={`p-3 rounded-xl border flex items-start gap-2.5 ${isLightMode ? 'bg-slate-50 border-slate-200' : 'bg-slate-850 border-slate-800'}`}>
                  <Smartphone className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                  <div>
                    <strong>No Android:</strong> Toque no menu de 3 pontos no canto superior direito do Chrome e selecione <em>&ldquo;Instalar aplicativo&rdquo;</em> ou <em>&ldquo;Adicionar à tela inicial&rdquo;</em>.
                  </div>
                </div>
              </div>

              <button
                onClick={() => setShowGeneralGuide(false)}
                className="mt-5 w-full py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-xs transition cursor-pointer"
              >
                Fechar
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  // Sidebar Variant
  return (
    <button
      onClick={handleInstallClick}
      className={`w-full text-left px-3.5 py-2.5 rounded-2xl text-xs flex items-center justify-between border transition cursor-pointer font-semibold shadow-sm group ${
        isLightMode
          ? 'bg-gradient-to-r from-cyan-50 to-blue-50 hover:from-cyan-100 hover:to-blue-100 text-blue-900 border-blue-200'
          : 'bg-gradient-to-r from-cyan-950/40 via-blue-950/30 to-indigo-950/40 hover:from-cyan-900/50 hover:to-blue-900/50 text-cyan-200 border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.1)]'
      }`}
    >
      <span className="flex items-center gap-2.5">
        <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 text-white flex items-center justify-center shrink-0 shadow-sm">
          <Download className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
        </div>
        <div>
          <div className="font-bold leading-tight">Instalar Aplicativo</div>
          <div className="text-[10px] text-slate-400">Atalho na Tela de Início</div>
        </div>
      </span>
      <span className="px-2 py-0.5 rounded-full text-[9px] font-mono font-bold bg-cyan-500/20 text-cyan-600 dark:text-cyan-300 border border-cyan-500/30">
        PWA
      </span>
    </button>
  );
};
