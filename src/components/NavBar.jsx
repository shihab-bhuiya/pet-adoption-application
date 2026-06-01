'use client'
import { authClient } from '@/lib/auth-client';
import Link from 'next/link';
import React from 'react';

const NavBar = () => {
    const { data: session } = authClient.useSession()
    const user = session?.user;
    console.log("user",user);

    

    return (
        <nav className='flex items-center justify-between p-4'>
            <div>
                <h1 className='btn text-3xl btn-soft btn-accent'><Link href={'/'}>PetHeaven</Link></h1>
            </div>
            <div>
                <ul className='flex gap-4 text-lg items-center'>
                    <li> <Link href={'/'}>Home</Link></li>
                    <li> <Link href={'/all-pets'}>All Pets</Link></li>
                </ul>
            </div>
            <div>
                <ul className='flex gap-3 items-center'>
                    {user ? (
                        <>
                            <div><img src={user.image} alt={user.name} className='w-8 h-8 rounded-full' /></div>
                            <li><Link href={'/profile'}> <button className="btn btn-soft btn-accent"   >{user.name} </button> </Link></li>
                            <li><Link href={'/dashboard'}> <button className="btn btn-soft btn-accent">Dashboard</button> </Link></li>
                            <li> <button onClick={() => authClient.signOut()} className="btn btn-soft btn-error">Logout</button></li>
                        </>
                    ) : (
                        <>
                            <li><Link href={'/login'}>login</Link> </li>
                            <li><Link href={'/sign-up'}><button className="btn btn-soft btn-accent">Get Start</button> </Link></li>
                        </>
                    )}
                </ul>
            </div>
        </nav>
    );
};

export default NavBar;