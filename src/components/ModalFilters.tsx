import { useEffect, useRef, useState } from 'react';
import { ExperienceDictionary } from '../services/Infojobs.service';

export function ModalFilters(data: modalProps) {
  const [keyWordsOkey, setKeyWordOkey] = useState(false);
  const [searching, setSearching] = useState(false);
  const classButton = useRef<string>('bg-primary-disabled');

  useEffect(() => {
    classButton.current = 'bg-primary';
    setSearching(false);
    setKeyWordOkey(true);
  }, [data.isEmptyResults]);

  const clickHandler = (event: any) => {
    //Todo: Seccionar this
    classButton.current = 'bg-primary-disabled';
    setSearching(true);
    setKeyWordOkey(false);

    event.preventDefault();
    const formData = Object.fromEntries(new FormData(event.target));
    let minSalary = formData.minSalary as string;
    if (minSalary) {
      minSalary = minSalary.replace(/\D/g, '');
    }
    formData.minSalary = minSalary;

    if (formData.exp === 'seleccionar') formData.exp = '';

    // console.log(formData);
    data.clickFunction(formData);
  };

  const keywordsChangeHandler = (event: any) => {
    if (event.target.value.length > 2) {
      setKeyWordOkey(true);
      classButton.current = 'bg-primary';
    } else {
      classButton.current = 'bg-primary-disabled';
      setKeyWordOkey(false);
    }
  };

  return (
    <>
      <div
        className='relative z-10'
        aria-labelledby='modal-title'
        role='dialog'
        aria-modal='true'
      >
        <div className='fixed inset-0 bg-gray-400 bg-opacity-40 transition-opacity'></div>

        <div className='fixed inset-0 z-10 overflow-y-auto'>
          <div className='flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0'>
            <div className='relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 modal-container'>
              <form id='form' onSubmit={clickHandler}>
                <div className='bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4'>
                  <div className='sm:flex sm:items-start'>
                    <div className='mt-3 w-full text-center sm:ml-4 sm:mt-0 sm:text-left'>
                      <h3
                        className='text-base text-center w-[50%] m-auto font-semibold leading-6 text-gray-900 pb-3 bb-primary'
                        id='modal-title'
                      >
                        FILTROS DE BÚSQUEDA
                      </h3>
                      <div className='mt-5'>
                        <label className='block mt-2 mb-2 text-sm font-medium text-gray-900'>
                          Crítierios de búsqueda:{' '}
                          <span className='text-red-500'>*</span>
                        </label>
                        <textarea
                          id='keywords'
                          name='keywords'
                          onKeyUp={keywordsChangeHandler}
                          className='block p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-400 focus:ring-blue-500 focus:border-blue-500 '
                          placeholder='Mesero, Analista, Desarrollador, Gerente, Docente ... etc.'
                        ></textarea>

                        <label className='block mb-2 text-sm font-medium text-gray-900 mt-3 '>
                          Experiencia:
                        </label>
                        <select
                          id='exp'
                          name='exp'
                          className='bg-white border border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
                        >
                          {data.expDictionary.map((exp) => {
                            return (
                              <option key={exp.id} value={exp.key}>
                                {exp.value}
                              </option>
                            );
                          })}
                        </select>

                        <label className='block mt-3 mb-2 text-sm font-medium text-gray-900'>
                          Salario mínimo:
                        </label>
                        <div className='relative mb-6'>
                          <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
                            <span className='euro'>€</span>
                          </div>
                          <input
                            type='text'
                            name='minSalary'
                            id='minSalary'
                            className='bg-white border border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  '
                            placeholder='45000'
                          ></input>
                        </div>
                      </div>

                      {data.isEmptyResults && (
                        <div className='w-full text-center text-sm'>
                          <p className='text-red-600'>
                            No se encontraron resultados con estos criterios
                          </p>
                          <p className='text-red-600'>
                            Por favor intenta con otros !Seguro que ahora si
                            encuentras!
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className='bg-white px-4 py-3  w-full text-center'>
                  <button
                    disabled={!keyWordsOkey}
                    type='submit'
                    className={
                      classButton.current +
                      ' mt-3 inline-flex w-full justify-center rounded-md  text-white px-5 py-2 text-sm font-semibold shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-white sm:mt-0 sm:w-auto'
                    }
                  >
                    <svg
                      fill='none'
                      stroke='#ffffff'
                      width={22}
                      viewBox='0 0 24 24'
                      xmlns='http://www.w3.org/2000/svg'
                      aria-hidden='true'
                    >
                      <path d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z'></path>
                    </svg>
                    <span className='px-3'>
                      {searching ? 'Buscando...' : 'Buscar'}
                    </span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

interface modalProps {
  isEmptyResults: boolean;
  clickFunction: (filters: any) => void;
  expDictionary: ExperienceDictionary[];
}
