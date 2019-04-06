import { connect } from 'react-redux';
import Application from './application.component';

// grab page type
const mapStateToProps = ({ page }) => ({
	page
});

export default connect(mapStateToProps)(Application);