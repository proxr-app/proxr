import React, { createContext, useContext, useState, useCallback } from 'react';
import { X, CheckCircle, AlertTriangle, Info } from 'lucide-react';

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'info', duration = 3000) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { id, message, type }]);

    setTimeout(() => {
      removeToast(id);
    }, duration);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const showSuccess = useCallback((message) => addToast(message, 'success'), [addToast]);
  const showError = useCallback((message) => addToast(message, 'error'), [addToast]);
  const showInfo = useCallback((message) => addToast(message, 'info'), [addToast]);

  return (
    <ToastContext.Provider value={{ showSuccess, showError, showInfo, removeToast }}>
      {children}
      
      {/* Toast Container */}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm w-full">
        {toasts.map(toast => {
          let borderClass = 'border-muted';
          let Icon = Info;
          
          if (toast.type === 'success') {
            borderClass = 'border-l-[4px] border-l-green-custom';
            Icon = CheckCircle;
          } else if (toast.type === 'error') {
            borderClass = 'border-l-[4px] border-l-error';
            Icon = AlertTriangle;
          } else {
            borderClass = 'border-l-[4px] border-l-white';
          }
          
          return (
            <div
              key={toast.id}
              className={`flex items-start justify-between bg-surface border border-border-custom p-4 rounded shadow-lg transition-all duration-300 page-transition ${borderClass}`}
            >
              <div className="flex gap-3">
                <Icon className={`w-5 h-5 flex-shrink-0 mt-0.5 ${toast.type === 'success' ? 'text-green-custom' : toast.type === 'error' ? 'text-error' : 'text-white'}`} />
                <p className="text-sm text-off-white font-mono lowercase">{toast.message}</p>
              </div>
              <button
                onClick={() => removeToast(toast.id)}
                className="text-muted hover:text-white transition-colors ml-2"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}
