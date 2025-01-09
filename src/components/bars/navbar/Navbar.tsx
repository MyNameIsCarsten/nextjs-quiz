import Link from "next/link";
import styles from "../../../styles/navbar.module.css";

const Navbar = () => {
    return (
        <div>
            <nav className={styles.nav}>
                <div>
                    <Link href="/">Quiz</Link>
                </div>
                <div>
                    <Link href="/questions">Edit Quiz</Link>
                    <span>|</span>
                    <Link href="/settings">Settings</Link>
                </div>
            </nav>
         </div>
    );
}

export default Navbar;