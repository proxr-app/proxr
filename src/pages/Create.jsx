import React, { useState } from 'react';
import { useMockStore } from '../lib/mockStore';
import { usePrivy } from '../lib/auth';
import { useToast } from '../components/ui/ToastProvider';
import { 
  Camera, 
  Download, 
  ChevronDown, 
  ChevronUp, 
  Sliders, 
  Sparkles,
  Lock
} from 'lucide-react';

const STYLES = ['none', 'photo', 'cinematic', 'anime', 'digital art', '3d'];
const RATIOS = ['square', 'portrait', 'landscape'];

export default function Create() {
  const { credits, deductCredits } = useMockStore();
  const { authenticated, login } = usePrivy();
  const { showSuccess, showError } = useToast();

  // Settings state
  const [prompt, setPrompt] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('none');
  const [selectedRatio, setSelectedRatio] = useState('square');
  const [nsfw, setNsfw] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  
  // Advanced state
  const [negativePrompt, setNegativePrompt] = useState('');
  const [steps, setSteps] = useState(32);
  const [guidance, setGuidance] = useState(4.0);
  const [seed, setSeed] = useState('');

  // Generation status
  const [status, setStatus] = useState('idle'); // 'idle', 'generating', 'success'
  const [generatedImg, setGeneratedImg] = useState(null);
  const [currentSeed, setCurrentSeed] = useState(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      showError('please enter a prompt');
      return;
    }

    if (!authenticated) {
      showError('please connect your wallet first');
      return;
    }

    if (credits < 20) {
      showError('insufficient credits. top up in the navigation bar.');
      return;
    }

    // Deduct credits
    deductCredits(20);
    setStatus('generating');
    setGeneratedImg(null);

    // Mock API generation call
    try {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      
      // Determine which image to show
      let imgPath = '/assets/proxr_network.png';
      if (selectedStyle === 'anime') {
        imgPath = '/assets/proxr_anime.png';
      } else if (['photo', 'cinematic', '3d'].includes(selectedStyle)) {
        imgPath = '/assets/proxr_gpu.png';
      }

      setGeneratedImg(imgPath);
      setCurrentSeed(seed || Math.floor(Math.random() * 99999999));
      setStatus('success');
      showSuccess('image generated successfully');
    } catch (err) {
      showError('failed to generate image');
      setStatus('idle');
    }
  };

  const handleDownload = () => {
    if (!generatedImg) return;
    
    // Simulate image download
    const link = document.createElement('a');
    link.href = generatedImg;
    link.download = `proxr-${selectedStyle}-${currentSeed}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    showSuccess('download started');
  };

  return (
    <div className="flex h-[calc(100vh-69px)] w-full overflow-hidden font-mono page-transition bg-bg">
      {/* Left Panel: Controls (Sidebar) */}
      <div className="w-[350px] bg-surface border-r border-border-custom flex flex-col flex-shrink-0 h-full overflow-y-auto p-5 gap-5 relative">
        
        {/* Prompt */}
        <div className="flex flex-col gap-2">
          <label className="text-xs text-muted lowercase">prompt</label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="describe what you want to generate..."
            disabled={status === 'generating'}
            rows={4}
            className="bg-bg border border-border-custom text-white text-sm rounded p-3 outline-none focus:border-white/40 transition-colors resize-none lowercase"
          />
        </div>

        {/* Style */}
        <div className="flex flex-col gap-2">
          <label className="text-xs text-muted lowercase">style</label>
          <div className="flex flex-wrap gap-2">
            {STYLES.map(style => (
              <button
                key={style}
                onClick={() => setSelectedStyle(style)}
                disabled={status === 'generating'}
                className={`text-xs px-3 py-1.5 rounded font-mono transition-colors lowercase border ${
                  selectedStyle === style
                    ? 'bg-white text-black border-white font-bold'
                    : 'bg-bg text-muted border-border-custom hover:text-white'
                }`}
              >
                {style}
              </button>
            ))}
          </div>
        </div>

        {/* Aspect Ratio */}
        <div className="flex flex-col gap-2">
          <label className="text-xs text-muted lowercase">aspect ratio</label>
          <div className="flex flex-wrap gap-2">
            {RATIOS.map(ratio => (
              <button
                key={ratio}
                onClick={() => setSelectedRatio(ratio)}
                disabled={status === 'generating'}
                className={`text-xs px-3 py-1.5 rounded font-mono transition-colors lowercase border ${
                  selectedRatio === ratio
                    ? 'bg-white text-black border-white font-bold'
                    : 'bg-bg text-muted border-border-custom hover:text-white'
                }`}
              >
                {ratio}
              </button>
            ))}
          </div>
        </div>

        {/* NSFW toggle */}
        <div className="flex items-center justify-between border-t border-border-custom pt-4">
          <div className="flex flex-col">
            <span className="text-xs text-white lowercase">nsfw filter</span>
            <span className="text-[10px] text-muted lowercase">allow adult content (18+)</span>
          </div>
          <button
            onClick={() => setNsfw(!nsfw)}
            disabled={status === 'generating'}
            className={`w-10 h-5 rounded-full p-0.5 transition-colors duration-200 outline-none ${
              nsfw ? 'bg-green-custom' : 'bg-surface-2'
            }`}
          >
            <div
              className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-200 ${
                nsfw ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* Advanced accordion */}
        <div className="border-t border-border-custom pt-4">
          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="w-full flex items-center justify-between text-xs text-muted hover:text-white transition-colors lowercase"
          >
            <span className="flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5" />
              advanced settings
            </span>
            {showAdvanced ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>

          {showAdvanced && (
            <div className="flex flex-col gap-4 mt-4 page-transition">
              {/* Negative Prompt */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] text-muted lowercase">negative prompt</label>
                <textarea
                  value={negativePrompt}
                  onChange={(e) => setNegativePrompt(e.target.value)}
                  placeholder="elements to exclude from image..."
                  rows={2}
                  className="bg-bg border border-border-custom text-white text-xs rounded p-2 outline-none focus:border-white/40 transition-colors resize-none lowercase"
                />
              </div>

              {/* Steps */}
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between text-[10px] text-muted">
                  <span className="lowercase">steps</span>
                  <span>{steps}</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="64"
                  value={steps}
                  onChange={(e) => setSteps(parseInt(e.target.value))}
                  className="w-full accent-white h-1 bg-surface-2 rounded outline-none cursor-pointer"
                />
              </div>

              {/* Guidance */}
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between text-[10px] text-muted">
                  <span className="lowercase">guidance scale</span>
                  <span>{guidance.toFixed(1)}</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  step="0.5"
                  value={guidance}
                  onChange={(e) => setGuidance(parseFloat(e.target.value))}
                  className="w-full accent-white h-1 bg-surface-2 rounded outline-none cursor-pointer"
                />
              </div>

              {/* Seed */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] text-muted lowercase">seed</label>
                <input
                  type="number"
                  value={seed}
                  onChange={(e) => setSeed(e.target.value)}
                  placeholder="random seed (leave empty)"
                  className="bg-bg border border-border-custom text-white text-xs rounded p-2 outline-none focus:border-white/40 transition-colors font-mono lowercase"
                />
              </div>
            </div>
          )}
        </div>

        {/* Generate Button */}
        <button
          onClick={handleGenerate}
          disabled={!prompt.trim() || status === 'generating' || !authenticated}
          className="w-full bg-white hover:bg-off-white text-black font-bold text-sm py-3 rounded transition-colors lowercase flex items-center justify-center gap-2 disabled:opacity-50 mt-auto"
        >
          <Sparkles className="w-4 h-4" />
          generate image · 20 credits
        </button>

        {/* Wallet connect blocker */}
        {!authenticated && (
          <div className="absolute inset-0 bg-bg/85 backdrop-blur-[1px] flex items-center justify-center rounded-lg border border-border-custom p-4 text-center">
            <button
              onClick={login}
              className="flex items-center gap-2 bg-white text-black text-xs font-bold font-mono px-4 py-2 rounded hover:bg-off-white transition-colors lowercase"
            >
              <Lock className="w-3.5 h-3.5" />
              connect wallet to create
            </button>
          </div>
        )}
      </div>

      {/* Right Panel: Output */}
      <div className="flex-1 flex flex-col h-full bg-bg p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-bold text-white lowercase">
            proxr create
          </h1>
          {authenticated && (
            <div className="text-xs text-muted">
              balance: <span className="text-white font-bold">{credits} credits</span>
            </div>
          )}
        </div>

        {/* Canvas Area */}
        <div className="flex-1 bg-surface border border-border-custom rounded-lg flex flex-col items-center justify-center p-6 relative overflow-hidden group">
          {/* Default idle state */}
          {status === 'idle' && (
            <div className="flex flex-col items-center gap-3 text-muted text-center max-w-sm">
              <Camera className="w-10 h-10 text-muted" />
              <p className="text-xs lowercase">
                your image will appear here
              </p>
            </div>
          )}

          {/* Loading state */}
          {status === 'generating' && (
            <div className="flex flex-col items-center gap-4 text-center max-w-sm">
              <div className="w-12 h-12 rounded bg-surface-2 border border-border-custom flex items-center justify-center animate-pulse">
                <Sparkles className="w-6 h-6 text-muted animate-pulse" />
              </div>
              <div className="flex flex-col gap-1.5">
                <p className="text-white text-sm lowercase font-bold">generating...</p>
                <p className="text-muted text-[10px] lowercase animate-pulse-cursor">
                  this takes ~15 seconds on the decentralized worker
                </p>
              </div>
            </div>
          )}

          {/* Generated success state */}
          {status === 'success' && generatedImg && (
            <div className="relative w-full h-full flex items-center justify-center">
              <img
                src={generatedImg}
                alt={prompt}
                className={`max-w-full max-h-[calc(100vh-250px)] object-contain rounded border border-border-custom ${
                  selectedRatio === 'portrait' ? 'aspect-[3/4]' : selectedRatio === 'landscape' ? 'aspect-[16/9]' : 'aspect-square'
                }`}
              />

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-4 font-mono">
                <button
                  onClick={handleDownload}
                  className="bg-white text-black font-bold text-xs px-4 py-2.5 rounded hover:bg-off-white transition-colors flex items-center gap-2 lowercase cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  download image
                </button>
                <div className="text-[10px] text-muted flex flex-col items-center">
                  <span>seed: {currentSeed}</span>
                  <span>style: {selectedStyle}</span>
                  <span>ratio: {selectedRatio}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer info bar */}
        {status === 'success' && (
          <div className="flex justify-between items-center bg-surface border border-border-custom rounded px-4 py-2.5 text-[10px] text-muted mt-4">
            <span className="truncate max-w-[70%]">prompt: "{prompt}"</span>
            <span className="text-green-custom flex-shrink-0">credits deducted: 20</span>
          </div>
        )}
      </div>
    </div>
  );
}
