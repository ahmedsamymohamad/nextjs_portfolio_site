"use client"
import About from '@/components/about';
import Contact from '@/components/contact';
import Footer from '@/components/footer';
import Header from '@/components/header';
import NavBar from '@/components/navBar'
import Portfolio from '@/components/portfolio';
import Services from '@/components/services';

export default function Home() {


  return (
    <>
      <NavBar/>
      <Header/>
      <Services/>
      <Portfolio/>
      <About/>
      <Contact/>
      <Footer/>
    </>
  );
}
