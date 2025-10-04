import React from 'react';
import StaggeredMenu from './StaggeredMenu';

const Nav = () => {

    const menuItems = [
        { label: 'Home', ariaLabel: 'Go to home page', link: '#home' },
        { label: 'About', ariaLabel: 'Learn about us', link: '#about' },
        { label: 'Project', ariaLabel: 'View our services', link: '#project' },
        { label: 'Contact', ariaLabel: 'Get in touch', link: '#contact' }
    ];


    const socialItems = [
        { label: 'GitHub', link: 'https://github.com/jeganxthan' },
        { label: 'LinkedIn', link: 'https://www.linkedin.com/in/jeganathan-i-430869258' }
    ];

    return (
        <div style={{ height: '100vh' }} >
            <StaggeredMenu
                position="right"
                items={menuItems}
                socialItems={socialItems}
                displaySocials={true}
                displayItemNumbering={true}
                menuButtonColor="#fff"
                openMenuButtonColor="#000000"
                changeMenuColorOnOpen={true}
                colors={['#E2DFD2', '#0a021b']}
                accentColor="#6B21A8"
                onMenuOpen={() => console.log('Menu opened')}
                onMenuClose={() => console.log('Menu closed')}
            />
        </div>
    );
}

export default Nav;
