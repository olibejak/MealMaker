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

const CheckmarkIconWhite = () => (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <Path
            d="M9 16.17L4.83 12L3.41 13.41L9 19L21 7L19.59 5.59L9 16.17Z"
            fill="white"/>
    </Svg>
);

const CheckmarkIconBlack = () => (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <Path d="M8.99991 16.17L4.82991 12L3.40991 13.41L8.99991 19L20.9999 7.00003L19.5899 5.59003L8.99991 16.17Z"
              fill="black"/>
    </Svg>
)

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
const TimerIcon = () => (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <Path
            d="M15 1.5H9V3.5H15V1.5ZM11 14.5H13V8.5H11V14.5ZM19.03 7.89L20.45 6.47C20.02 5.96 19.55 5.48 19.04 5.06L17.62 6.48C16.07 5.24 14.12 4.5 12 4.5C7.03 4.5 3 8.53 3 13.5C3 18.47 7.02 22.5 12 22.5C16.98 22.5 21 18.47 21 13.5C21 11.38 20.26 9.43 19.03 7.89ZM12 20.5C8.13 20.5 5 17.37 5 13.5C5 9.63 8.13 6.5 12 6.5C15.87 6.5 19 9.63 19 13.5C19 17.37 15.87 20.5 12 20.5Z"
            fill="black"/>
    </Svg>
)
const ArrowDropDown = () => (
    <Svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
        <Path d="M7 10L12 15L17 10H7Z" fill="#49454F"/>
    </Svg>
)
const EditIcon = () => (
    <Svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
        <Path fill-rule="evenodd" clip-rule="evenodd"
              d="M19.06 3.59L20.41 4.94C21.2 5.72 21.2 6.99 20.41 7.77L7.18 21H3V16.82L13.4 6.41L16.23 3.59C17.01 2.81 18.28 2.81 19.06 3.59ZM5 19L6.41 19.06L16.23 9.23L14.82 7.82L5 17.64V19Z"
              fill="#49454F"/>
    </Svg>
)

const NotificationIcon = () => (
    <Svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
        <Path
            d="M12 21.75C13.1 21.75 14 20.85 14 19.75H10C10 20.85 10.9 21.75 12 21.75ZM18 15.75V10.75C18 7.68 16.37 5.11 13.5 4.43V3.75C13.5 2.92 12.83 2.25 12 2.25C11.17 2.25 10.5 2.92 10.5 3.75V4.43C7.64003 5.11 6.00003 7.67 6.00003 10.75V15.75L4.00003 17.75V18.75H20V17.75L18 15.75ZM16 16.75H8.00003V10.75C8.00003 8.27 9.51003 6.25 12 6.25C14.49 6.25 16 8.27 16 10.75V16.75ZM7.58003 3.83L6.15003 2.4C3.75003 4.23 2.17003 7.05 2.03003 10.25H4.03003C4.18003 7.6 5.54003 5.28 7.58003 3.83ZM19.97 10.25H21.97C21.82 7.05 20.24 4.23 17.85 2.4L16.43 3.83C18.45 5.28 19.82 7.6 19.97 10.25Z"
            fill="black"/>
    </Svg>
)

const VolumeIcon = () => (
    <Svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
        <Path
            d="M3 9.00006V15.0001H7L12 20.0001V4.00006L7 9.00006H3ZM10 8.83006V15.1701L7.83 13.0001H5V11.0001H7.83L10 8.83006ZM16.5 12.0001C16.5 10.2301 15.48 8.71006 14 7.97006V16.0201C15.48 15.2901 16.5 13.7701 16.5 12.0001ZM14 3.23006V5.29006C16.89 6.15006 19 8.83006 19 12.0001C19 15.1701 16.89 17.8501 14 18.7101V20.7701C18.01 19.8601 21 16.2801 21 12.0001C21 7.72006 18.01 4.14006 14 3.23006Z"
            fill="black"/>
    </Svg>
)

const VibrationIcon = () => (
    <Svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
        <Path
            d="M0 15.0001H2V9.00012H0V15.0001ZM3 17.0001H5V7.00012H3V17.0001ZM22 9.00012V15.0001H24V9.00012H22ZM19 17.0001H21V7.00012H19V17.0001ZM16.5 3.00012H7.5C6.67 3.00012 6 3.67012 6 4.50012V19.5001C6 20.3301 6.67 21.0001 7.5 21.0001H16.5C17.33 21.0001 18 20.3301 18 19.5001V4.50012C18 3.67012 17.33 3.00012 16.5 3.00012ZM16 19.0001H8V5.00012H16V19.0001Z"
            fill="black"/>
    </Svg>
)

const FlashlightIcon = () => (
    <Svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
        <Path
            d="M18 2.00018H6V8.00018L8 11.0002V22.0002H16V11.0002L18 8.00018V2.00018ZM16 4.00018V5.00018H8V4.00018H16ZM14 10.4002V20.0002H10V10.3902L8 7.39018V7.00018H16V7.39018L14 10.4002Z"
            fill="black"/>
        <Path
            d="M12 15.5002C12.8284 15.5002 13.5 14.8286 13.5 14.0002C13.5 13.1718 12.8284 12.5002 12 12.5002C11.1716 12.5002 10.5 13.1718 10.5 14.0002C10.5 14.8286 11.1716 15.5002 12 15.5002Z"
            fill="black"/>
    </Svg>
)

const PhoneLinkIcon = () => (
    <Svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
        <Path
            d="M20.1125 7.70024L19.1125 8.70024C20.9125 10.5002 20.9125 13.3002 19.1125 15.2002L20.1125 16.2002C22.6125 13.9002 22.6125 10.1002 20.1125 7.70024ZM18.0125 9.80024L17.0125 10.8002C17.5125 11.5002 17.5125 12.4002 17.0125 13.1002L18.0125 14.1002C19.2125 12.9002 19.2125 11.1002 18.0125 9.80024ZM14.0125 1.00024H4.01245C2.91245 1.00024 2.01245 1.90024 2.01245 3.00024V21.0002C2.01245 22.1002 2.91245 23.0002 4.01245 23.0002H14.0125C15.1125 23.0002 16.0125 22.1002 16.0125 21.0002V3.00024C16.0125 1.90024 15.1125 1.00024 14.0125 1.00024ZM14.0125 20.0002H4.01245V4.00024H14.0125V20.0002Z"
            fill="black"/>
    </Svg>
)

const CameraIcon = () => (
    <Svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 18 18" fill="none">
        <Path
            d="M9 12.15C10.3255 12.15 11.4 11.0755 11.4 9.75C11.4 8.42452 10.3255 7.35 9 7.35C7.67452 7.35 6.6 8.42452 6.6 9.75C6.6 11.0755 7.67452 12.15 9 12.15Z"
            fill="black"/>
        <Path
            d="M6.75 2.25L5.3775 3.75H3C2.175 3.75 1.5 4.425 1.5 5.25V14.25C1.5 15.075 2.175 15.75 3 15.75H15C15.825 15.75 16.5 15.075 16.5 14.25V5.25C16.5 4.425 15.825 3.75 15 3.75H12.6225L11.25 2.25H6.75ZM9 13.5C6.93 13.5 5.25 11.82 5.25 9.75C5.25 7.68 6.93 6 9 6C11.07 6 12.75 7.68 12.75 9.75C12.75 11.82 11.07 13.5 9 13.5Z"
            fill="black"/>
    </Svg>
)

const ImageIcon = () => (
    <Svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 18 18" fill="none">
        <Path
            d="M15.75 14.25V3.75C15.75 2.925 15.075 2.25 14.25 2.25H3.75C2.925 2.25 2.25 2.925 2.25 3.75V14.25C2.25 15.075 2.925 15.75 3.75 15.75H14.25C15.075 15.75 15.75 15.075 15.75 14.25ZM6.375 10.125L8.25 12.3825L10.875 9L14.25 13.5H3.75L6.375 10.125Z"
            fill="black"/>
    </Svg>
)

const ShoppingCartIcon = () => (
    <Svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
        <Path
            d="M8 18C6.9 18 6.01 18.9 6.01 20C6.01 21.1 6.9 22 8 22C9.1 22 10 21.1 10 20C10 18.9 9.1 18 8 18ZM18 18C16.9 18 16.01 18.9 16.01 20C16.01 21.1 16.9 22 18 22C19.1 22 20 21.1 20 20C20 18.9 19.1 18 18 18ZM9.1 13H16.55C17.3 13 17.96 12.59 18.3 11.97L22 4.96L20.25 4L16.55 11H9.53L5.27 2H2V4H4L7.6 11.59L6.25 14.03C5.52 15.37 6.48 17 8 17H20V15H8L9.1 13ZM13 2L17 6L13 10L11.59 8.59L13.17 7H9V5H13.17L11.58 3.41L13 2Z"
            fill="black"/>
    </Svg>
)

const ReloadIcon = () => (
    <Svg height="24" viewBox="0 -960 960 960" width="24">
        <Path
            d="M160-160v-80h110l-16-14q-52-46-73-105t-21-119q0-111 66.5-197.5T400-790v84q-72 26-116 88.5T240-478q0 45 17 87.5t53 78.5l10 10v-98h80v240H160Zm400-10v-84q72-26 116-88.5T720-482q0-45-17-87.5T650-648l-10-10v98h-80v-240h240v80H690l16 14q49 49 71.5 106.5T800-482q0 111-66.5 197.5T560-170Z"
            fill="#49454F"
        />
    </Svg>
)
const CloseIcon = () => (
    <Svg height="24" width="24" viewBox="0 0 24 24" fill="none">
        <Path d="M6 6L18 18M6 18L18 6" stroke="black" strokeWidth="2"/>
    </Svg>
);
const PlayIcon = () => (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <Path d="M6.5 5V19L17.5 12L6.5 5Z" fill="black"/>
    </Svg>
)
const PauseIcon = () => (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <Path d="M6 19H10V5H6V19ZM14 5V19H18V5H14Z" fill="black"/>
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
    StarFilledIcon,
    TimerIcon,
    ArrowDropDown,
    CheckmarkIconWhite,
    EditIcon,
    NotificationIcon,
    VolumeIcon,
    VibrationIcon,
    FlashlightIcon,
    PhoneLinkIcon,
    CameraIcon,
    ImageIcon,
    CheckmarkIconBlack,
    ShoppingCartIcon,
    ReloadIcon,
    CloseIcon,
    PlayIcon,
    PauseIcon,
}