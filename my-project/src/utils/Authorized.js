import RenderAuthorized from '../components/Authorized';
import { getAuthority } from './GlobalContent';

const Authorized = RenderAuthorized(getAuthority());
export default Authorized;
