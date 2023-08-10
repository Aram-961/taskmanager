import Link from 'next/link'
import React from 'react'

const Header = () => {
    return (
        <div class="main-header">
            <div class="main-header__inner">
                <div class="main-header__left">
                    <Link href="/">Task List</Link>
                </div>

                <div class="main-header__right">
                    <button class="btn" type='button'>
                        Logout
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Header