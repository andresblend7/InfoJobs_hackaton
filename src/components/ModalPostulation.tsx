import { useEffect } from 'react';
import confetti from 'canvas-confetti';

export function ModalPostulation({ callbackCancel }: ModalPostulationProps) {
  useEffect(() => {
    confetti();
  }, []);
  return (
    <div
      className='relative z-10'
      aria-labelledby='modal-title'
      role='dialog'
      aria-modal='true'
    >
      <div className='fixed inset-0 bg-gray-400 bg-opacity-40 transition-opacity'></div>
      <div className='fixed inset-0 z-10 overflow-y-auto'>
        <div className='flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0'>
          <div className='relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 px-32'>
            <div className='bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4'>
              <h2 className='text-xl text-center font-bold mb-4 mt-5'>
                🥳 Felicitaciones 🎉
              </h2>
              <p className='mb-12 text-center mt-5 '>
                ¡Te haz postulado a la oferta que más te gustó!
              </p>
              <div className='flex justify-center'>
                <button className='bg-primary text-white font-bold py-2 px-4 rounded mr-2'>
                  Nueva búsqueda
                </button>
                <button
                  className='bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded'
                  onClick={() => {
                    callbackCancel();
                  }}
                >
                  Regresar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export interface ModalPostulationProps {
  callbackCancel: () => void;
}
