import Link from 'next/link';
import React from 'react';

const NavBar = () => {
    return (
        <nav className='flex justify-between p-4'>
            <div>
                <h1 className='btn btn-soft btn-accent'>PetHeaven</h1>
            </div>
            <div>
                <ul className='flex gap-3'>
                    <li> <Link href={'/'}>Home</Link></li>
                    <li> <Link href={'/all-pets'}>All Pets</Link></li>
                </ul>
            </div>
            <div>
                <ul className='flex gap-3 items-center'>
                    <li><Link href={'/login'}>login</Link> </li>
                    <li><Link href={'/sign-up'}><button className="btn btn-soft btn-accent">Get Start</button> </Link></li>
                </ul>
            </div>
        </nav>
    );
};

export default NavBar;