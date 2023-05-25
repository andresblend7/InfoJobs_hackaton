export function ModalFilters(data: modalProps) {
  const clickHandler = (event: any) => {
    console.log('clickHandler');
    // const search = new FormData(event.target).get('search');
    // const { search } = Object.fromEntries(new FormData(event.target));
    const formData = Object.fromEntries(new FormData(event.target));
    console.log(formData);
    data.clickFunction(formData);
  };

  return (
    <>
      <div
        className='relative z-10'
        aria-labelledby='modal-title'
        role='dialog'
        aria-modal='true'
      >
        <div className='fixed inset-0 bg-cyan-200 bg-opacity-75 transition-opacity'></div>

        <div className='fixed inset-0 z-10 overflow-y-auto'>
          <div className='flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0'>
            <div className='relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8'>
              <form id='form' onSubmit={clickHandler}>
                <div className='bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4'>
                  <div className='sm:flex sm:items-start'>
                    <div className='mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left'>
                      <h3
                        className='text-base font-semibold leading-6 text-gray-900'
                        id='modal-title'
                      >
                        Filtros iniciales
                      </h3>
                      <div className='mt-2'>
                        <label htmlFor=''>Experiencia:</label>
                        <select
                          name='exp'
                          className='w-full border-2 border-gray-400'
                          id=''
                        >
                          <option value='0'>Seleccione</option>
                        </select>
                        <label htmlFor='checkbox-1'>Palabras clave</label>
                        <input
                          type='text'
                          name='keywords'
                          className='w-full border-2 border-gray-400'
                        />
                        <label htmlFor='checkbox-1'>Salario mínimo </label>
                        <input
                          type='text'
                          name='minSalary'
                          className='w-full border-2 border-gray-400'
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className='bg-gray-50 px-4 py-3  w-full text-center'>
                  <button
                    type='submit'
                    className='mt-3 inline-flex w-full justify-center rounded-md bg-cyan-100 px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto'
                  >
                    Buscar
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
  clickFunction: (filters: any) => void;
}
