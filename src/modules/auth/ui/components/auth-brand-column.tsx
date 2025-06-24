import Image from 'next/image';

const AuthBrandColumn = () => {
  return (
    <div className='hidden md:flex flex-col gap-4 items-center justify-center bg-radial from-emerald-700 to-emerald-900'>
      <div className='p-5 rounded-2xl bg-emerald-50/20 backdrop-blur-sm border border-emerald-200/60 shadow-xl'>
        <Image
          src='logo.svg'
          alt='Meet・AI Logo'
          width={96}
          height={64}
          className='w-24 h-16 drop-shadow-lg hover:scale-110 transition-all duration-300 opacity-90'
          priority
        />
      </div>

      <div className='flex flex-col items-center justify-center'>
        <p className='text-white text-2xl font-semibold'>Meet・AI</p>
        <p className='text-emerald-100 text-sm font-light'>
          Intelligent Meeting Solutions
        </p>
      </div>
    </div>
  );
};

export default AuthBrandColumn;
