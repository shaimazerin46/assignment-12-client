import logo from '../assets/images/logo.png'




const Footer = () => {
    return (
        <div>
            <footer className="bg-white shadow-xl text-black border-t-[1px] border-gray-200 p-4">
 <div className="max-w-7xl mx-auto sm:footer-horizontal items-center footer">
 <aside className="grid-flow-col items-center">
   <img src={logo} alt="" className='w-20'/>
    <p>Copyright © {new Date().getFullYear()} - All right reserved</p>
  </aside>
  <nav className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
    <a href='https://www.facebook.com/shaimazerinrichi' target='_blank'>
     <img src="https://img.icons8.com/?size=48&id=118497&format=png" alt="" className='w-10'/>
    </a>
    <a href='https://www.linkedin.com/in/shaima-zerin-517b21355/' target='_blank'>
    <img src="https://img.icons8.com/?size=48&id=xuvGCOXi8Wyg&format=png" alt="" className='w-10'/>
    </a>
    <a href='https://www.youtube.com/' target='_blank'>
     <img src="https://img.icons8.com/?size=48&id=19318&format=png" alt="" className='w-10'/>
    </a>
  </nav>
 </div>
</footer>

        </div>
    );
};

export default Footer;