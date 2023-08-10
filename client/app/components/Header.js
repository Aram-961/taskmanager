import { Link } from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useGlobalContext } from '../context/GlobalContext';

const Header = () => {
    const { user } = useGlobalContext();
    const router = useRouter();
    const { pathname } = router.query;
    return (
        <div class="main-header">
            <div class="main-header__inner">
                <div class="main-header__left">
                    <Link href="/">Task List</Link>
                </div>

                <div class="main-header__right">
                    {user ? (

                        <button class="btn" type='button'>
                            Logout
                        </button>
                    ) :
                        <Link href="/Register" className="btn">Register</Link>
                    }
                </div>
            </div>
        </div>
    );
}

export default Header;