import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { Actions } from "../../states/NumberSelectState";
import NumberSelect from "./NumberSelect";

const mapStateToProps = (state) => ({
  phoneNumber: state["outbound-callerid"].NumberSelect.phoneNumber,
  callerIds: state["outbound-callerid"].NumberSelect.callerIds
});

const mapDispatchToProps = (dispatch) => ({
  updateNumber: bindActionCreators(Actions.updateNumber, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(NumberSelect);
