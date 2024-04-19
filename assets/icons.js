import Svg, {G, Path, Rect} from "react-native-svg";

const HamburgerIcon = () =>(
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <G id="Icons/menu_24px">
            <Path id="icon" fillRule="evenodd" clipRule="evenodd" d="M3 8V6H21V8H3ZM3 13H21V11H3V13ZM3 18H21V16H3V18Z" fill="#1D1B20"/>
        </G>
    </Svg>
)

const BookIcon = () => (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <G id="Icon">
            <Path id="Vector"
                  d="M18 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V4C20 2.9 19.1 2 18 2ZM9 4H11V9L10 8.25L9 9V4ZM18 20H6V4H7V13L10 10.75L13 13V4H18V20Z"
                  fill="#1D1B20"/>
        </G>
    </Svg>
)

const EggIcon = () => (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <G id="Icon">
            <G id="Vector">
                <Path
                    d="M12 3C8.5 3 5 9.33 5 14C5 17.87 8.13 21 12 21C15.87 21 19 17.87 19 14C19 9.33 15.5 3 12 3ZM12 19C9.24 19 7 16.76 7 14C7 9.91 10.07 5 12 5C13.93 5 17 9.91 17 14C17 16.76 14.76 19 12 19Z"
                    fill="black"/>
                <Path
                    d="M13 16C12.42 16 10 15.92 10 13C10 12.45 9.55 12 9 12C8.45 12 8 12.45 8 13C8 16 9.99 18 13 18C13.55 18 14 17.55 14 17C14 16.45 13.55 16 13 16Z"
                    fill="black"/>
            </G>
        </G>
    </Svg>
)

const DiningIcon = () => (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <G id="local_dining">
            <Path id="Vector"
                  d="M7.79951 13.1283L10.6295 10.2983L3.60951 3.28832C2.04951 4.84832 2.04951 7.37832 3.60951 8.94832L7.79951 13.1283ZM14.5795 11.3183C16.1095 12.0283 18.2595 11.5283 19.8495 9.93832C21.7595 8.02832 22.1295 5.28832 20.6595 3.81832C19.1995 2.35832 16.4595 2.71832 14.5395 4.62832C12.9495 6.21832 12.4495 8.36832 13.1595 9.89832L3.39951 19.6583L4.80951 21.0683L11.6995 14.1983L18.5795 21.0783L19.9895 19.6683L13.1095 12.7883L14.5795 11.3183Z"
                  fill="black"/>
        </G>
    </Svg>
)

const FridgeIcon = () => (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <Path
            d="M8 5H10V8H8V5ZM8 12H10V17H8V12ZM18 2.01L6 2C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V4C20 2.89 19.1 2.01 18 2.01ZM18 20H6V10.98H18V20ZM18 9H6V4H18V9Z"
            fill="black"/>
    </Svg>
)

const BasketIcon = () => (
    <Svg width="24" height="24" viewBox="0 0 24 24"
         fill="none">
        <Path
            d="M22 9.49001H17.21L12.83 2.93001C12.64 2.65001 12.32 2.51001 12 2.51001C11.68 2.51001 11.36 2.65001 11.17 2.94001L6.79 9.49001H2C1.45 9.49001 1 9.94001 1 10.49C1 10.58 1.01 10.67 1.04 10.76L3.58 20.03C3.81 20.87 4.58 21.49 5.5 21.49H18.5C19.42 21.49 20.19 20.87 20.43 20.03L22.97 10.76L23 10.49C23 9.94001 22.55 9.49001 22 9.49001ZM12 5.29001L14.8 9.49001H9.2L12 5.29001ZM18.5 19.49L5.51 19.5L3.31 11.49H20.7L18.5 19.49ZM12 13.49C10.9 13.49 10 14.39 10 15.49C10 16.59 10.9 17.49 12 17.49C13.1 17.49 14 16.59 14 15.49C14 14.39 13.1 13.49 12 13.49Z"
            fill="black"/>
    </Svg>
)

const SearchIcon = () => (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <G id="icon">
            <Path id="icon" fillRule="evenodd" clipRule="evenodd"
                  d="M14.76 13.27L20.49 19L19 20.49L13.27 14.76C12.2 15.53 10.91 16 9.5 16C5.91 16 3 13.09 3 9.5C3 5.91 5.91 3 9.5 3C13.09 3 16 5.91 16 9.5C16 10.91 15.53 12.2 14.76 13.27ZM9.5 5C7.01 5 5 7.01 5 9.5C5 11.99 7.01 14 9.5 14C11.99 14 14 11.99 14 9.5C14 7.01 11.99 5 9.5 5Z"
                  fill="black"/>
        </G>
    </Svg>
)

const FridgeCardIcon = () => (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <G id="icon">
            <Path id="Vector"
                  d="M8 5H10V8H8V5ZM8 12H10V17H8V12ZM18 2.01L6 2C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V4C20 2.89 19.1 2.01 18 2.01ZM18 20H6V10.98H18V20ZM18 9H6V4H18V9Z"
                  fill="#49454F"/>
        </G>
    </Svg>
)

const BasketCardIcon = () => (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <G id="icon">
            <Path id="Vector"
                  d="M22 9.48999H17.21L12.83 2.92999C12.64 2.64999 12.32 2.50999 12 2.50999C11.68 2.50999 11.36 2.64999 11.17 2.93999L6.79 9.48999H2C1.45 9.48999 1 9.93999 1 10.49C1 10.58 1.01 10.67 1.04 10.76L3.58 20.03C3.81 20.87 4.58 21.49 5.5 21.49H18.5C19.42 21.49 20.19 20.87 20.43 20.03L22.97 10.76L23 10.49C23 9.93999 22.55 9.48999 22 9.48999ZM12 5.28999L14.8 9.48999H9.2L12 5.28999ZM18.5 19.49L5.51 19.5L3.31 11.49H20.7L18.5 19.49ZM12 13.49C10.9 13.49 10 14.39 10 15.49C10 16.59 10.9 17.49 12 17.49C13.1 17.49 14 16.59 14 15.49C14 14.39 13.1 13.49 12 13.49Z"
                  fill="#49454F"/>
        </G>
    </Svg>
)

const FilterIcon = () => (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <Path
            d="M7.005 6H17.005L11.995 12.3L7.005 6ZM4.255 5.61C6.275 8.2 10.005 13 10.005 13V19C10.005 19.55 10.455 20 11.005 20H13.005C13.555 20 14.005 19.55 14.005 19V13C14.005 13 17.725 8.2 19.745 5.61C20.255 4.95 19.785 4 18.955 4H5.045C4.215 4 3.745 4.95 4.255 5.61Z"
            fill="black"/>
    </Svg>
)

const BackArrowIcon = () => (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <Path
            d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"
            fill="#000000"
        />
    </Svg>
);

const CheckmarkIcon = () => (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <Path
            d="M9 16.17L4.83 12L3.41 13.41L9 19L21 7L19.59 5.59L9 16.17Z"
            fill="black"/>
    </Svg>
);

const PlusIcon = () => (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <Path
            d="M12 5v14m7-7H5"
            stroke="#000"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </Svg>
);

const PencilIcon = () => (
    <Svg width="24" height="24" viewBox="0 -960 960 960" fill="none">
        <Path
            d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"
            fill="#49454F"
        />
    </Svg>
);

const PotIcon = () => (
    <Svg width="26" height="26" viewBox="0 0 26 26" fill="none">
        <Path
            d="M4 10H22V19C22 19.8333 21.7083 20.5417 21.125 21.125C20.5417 21.7083 19.8333 22 19 22H7C6.16667 22 5.45833 21.7083 4.875 21.125C4.29167 20.5417 4 19.8333 4 19V10ZM6 12V19C6 19.2833 6.09583 19.5208 6.2875 19.7125C6.47917 19.9042 6.71667 20 7 20H19C19.2833 20 19.5208 19.9042 19.7125 19.7125C19.9042 19.5208 20 19.2833 20 19V12H6ZM4 9V7H10V6C10 5.71667 10.0958 5.47917 10.2875 5.2875C10.4792 5.09583 10.7167 5 11 5H15C15.2833 5 15.5208 5.09583 15.7125 5.2875C15.9042 5.47917 16 5.71667 16 6V7H22V9H4Z"
            fill="black"/>
    </Svg>
)

const GarbageIcon = () => (
    <Svg width="24" height="24" viewBox="0 -960 960 960" fill="none">
        <Path
            d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"
            fill="#49454F"
        />
    </Svg>
)

const StarOutlineIcon = () => (
    <Svg height="24" viewBox="0 -960 960 960" width="24">
        <Path
            d="m354-287 126-76 126 77-33-144 111-96-146-13-58-136-58 135-146 13 111 97-33 143ZM233-120l65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Zm247-350Z"/>
    </Svg>
)
const StarFilledIcon = () => (
    <Svg height="24" viewBox="0 -960 960 960" width="24">
        <Path
            d="m354-287 126-76 126 77-33-144 111-96-146-13-58-136-58 135-146 13 111 97-33 143ZM233-120l65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Zm247-350Z"
            fill="#49454F"
        />
    </Svg>
)
export {
    HamburgerIcon,
    BookIcon,
    EggIcon,
    DiningIcon,
    FridgeIcon,
    BasketIcon,
    SearchIcon,
    FridgeCardIcon,
    BasketCardIcon,
    FilterIcon,
    BackArrowIcon,
    CheckmarkIcon,
    PlusIcon,
    PencilIcon,
    PotIcon,
    GarbageIcon,
    StarOutlineIcon,
    StarFilledIcon
}