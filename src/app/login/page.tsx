'use client';

import React, { useEffect, useRef } from 'react';
import { animate } from 'animejs';
import styles from './login.module.css';

const LoginPage = () => {
    const pathRef = useRef<SVGPathElement>(null);
    const currentAnimation = useRef<any>(null);

    const handleFocus = (field: 'email' | 'password' | 'submit') => {
        if (currentAnimation.current) currentAnimation.current.pause();

        let strokeDashoffset = 0;
        let strokeDasharray = '240 1386';

        if (field === 'password') {
            strokeDashoffset = -336;
        } else if (field === 'submit') {
            strokeDashoffset = -730;
            strokeDasharray = '530 1386';
        }
        if (pathRef.current) {
            currentAnimation.current = animate(pathRef.current, {
                strokeDashoffset: strokeDashoffset,
                strokeDasharray: strokeDasharray,
                duration: 700,
                easing: 'easeOutQuart'
            });
        }

        return (
            <div className={styles.page}>
                <div className={styles.container}>
                    <div className={styles.left}>
                        <div className={styles.login}>Login</div>
                        <div className={styles.eula}>
                            By logging in you agree to the ridiculously long terms that you didn't bother to read
                        </div>
                        <button className={styles.googleLogin}>
                            <svg className={styles.googleIcon} viewBox="0 0 48 48">
                                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
                                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
                                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
                                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
                                <path fill="none" d="M0 0h48v48H0z" />
                            </svg>
                            Sign in with Google
                        </button>
                    </div>
                    <div className={styles.right}>
                        <svg className={styles.svg} viewBox="0 0 320 300">
                            <defs>
                                <linearGradient
                                    id="linearGradient"
                                    x1="13"
                                    y1="193.49992"
                                    x2="307"
                                    y2="193.49992"
                                    gradientUnits="userSpaceOnUse"
                                >
                                    <stop style={{ stopColor: '#ff00ff' }} offset="0" />
                                    <stop style={{ stopColor: '#ff0000' }} offset="1" />
                                </linearGradient>
                            </defs>
                            <path
                                ref={pathRef}
                                className={styles.path}
                                d="m 40,120.00016 239.99984,-3.2e-4 c 0,0 24.99263,0.79932 25.00016,35.00016 0.008,34.20084 -25.00016,35 -25.00016,35 h -239.99984 c 0,-0.0205 -25,4.01348 -25,38.5 0,34.48652 25,38.5 25,38.5 h 215 c 0,0 20,-0.99604 20,-25 0,-24.00396 -20,-25 -20,-25 h -190 c 0,0 -20,1.71033 -20,25 0,24.00396 20,25 20,25 h 168.57143"
                            />
                        </svg>
                        <div className={styles.form}>
                            <label className={styles.label} htmlFor="email">Email</label>
                            <input
                                className={styles.input}
                                type="email"
                                id="email"
                                onFocus={() => handleFocus('email')}
                            />
                            <label className={styles.label} htmlFor="password">Password</label>
                            <input
                                className={styles.input}
                                type="password"
                                id="password"
                                onFocus={() => handleFocus('password')}
                            />
                            <input
                                className={styles.submit}
                                type="submit"
                                id="submit"
                                value="Submit"
                                onFocus={() => handleFocus('submit')}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    export default LoginPage;
