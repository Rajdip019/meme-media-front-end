import React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Avatar } from '@mui/material';
import { ClassNameMap, DefaultTheme, makeStyles, WithStylesOptions } from '@mui/styles';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { signOut } from 'next-auth/react';

const Style = makeStyles<WithStylesOptions<DefaultTheme>>({ //Materia UI Styles for Menu
    menu: {
        "& .MuiPaper-root": { // This is to only style the Menu Paper Section
            backgroundColor: "#0d0d0d"
        }
    },
})

type Props = { //Interface of the Prop Passed in this Compnent
    img: string,
    name: string,
    email: string
    isauthenticated: "authenticated" | "unauthenticated" | "loading"
}

const NavbarMenu: React.FC<Props> = ({ img, name, email, isauthenticated }) => {

    const classes: ClassNameMap<"menu"> = Style()

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <React.Fragment>
            {isauthenticated === "authenticated" && (
                <div className='md:block hidden'>

                    <button
                        id="basic-button"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}

                    >
                        <div className='flex items-center'>
                            <Avatar className=' cursor-pointer ring-2 ring-white' src={img} alt={name} sx={{ width: 42, height: 42 }} />
                            <ArrowDropDownIcon className='ml-2' />
                        </div>
                    </button>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        className={classes.menu}
                    >
                        <div>
                            <>
                                <p className='text-gray-50 px-3 pt-3 font-semibold'>{name}</p>
                                <p className='text-gray-50 px-3 pb-3 font-light text-sm'>{email}</p>
                                <hr className='w-11/12 mx-auto' />
                                <MenuItem onClick={handleClose} className="text-white hover:bg-gray-800 transition-all font-semibold">Profile</MenuItem>
                                <MenuItem onClick={handleClose} className="text-white hover:bg-gray-800 transition-all font-semibold">Favourites</MenuItem>
                                <MenuItem onClick={handleClose} className="text-white hover:bg-gray-800 transition-all font-semibold">Donwloads</MenuItem>
                                <MenuItem onClick={handleClose} className="text-white hover:bg-gray-800 transition-all font-semibold">Your Memes</MenuItem>
                                <MenuItem onClick={(): void => { handleClose(); signOut(); }} className="text-white hover:bg-gray-800 transition-all font-semibold">Logout</MenuItem>
                            </>

                        </div>
                    </Menu>
                </div>
            )}
        </React.Fragment>
    );
};

export default NavbarMenu;
