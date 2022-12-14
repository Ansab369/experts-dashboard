import React ,{useState}  from "react";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import './revenue.css';
import DashBoardNavBoard from '../DashBoardNavBar';
function Revenue() {
  const [startDate, setStartDate] = useState(new Date());
  return (
   <div className="bg-gradient-1" >
   <DashBoardNavBoard/>
    <div className="Revenue">
       <div className="Container" >
           <div  className="social-container">
                   <div className="image-button">
                   <DatePicker
                  style={{color:'red',backgroundColor:'red'}}
                  className="datePicker"
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  dateFormat="MM/yyyy"
                  showMonthYearPicker
                  showFullMonthYearPicker
              />
              </div>
          </div>
        </div>
        {/* //! */}
        <div className="Container" >
           <div  className="dashboard-batch">
                   <p className="dashboard-batch-p">Batch Details</p>
                   <div className="table-head">
                         <div className="tablehead1"></div>
                         <p>Total batchs</p>  
                         <p className="total-batch-number">4</p>       
                   </div>
                   <table>
                    <tr>
                      <th>month</th>
                      <th>day</th>
                    </tr>
                    <tr>
                       <td>september</td>
                       <td>08</td>
                    </tr>
                    <tr>
                       <td>september</td>
                       <td>15</td>
                    </tr>
                    <tr>
                       <td>september</td>
                       <td>22</td>
                    </tr>
                    <tr>
                       <td>september</td>
                       <td>29</td>
                    </tr>
                   </table>
          </div>
        </div>
        {/* //! */}
        <div className="Container" >
           <div  className="dashboard-batch">
                   <p className="dashboard-batch-p">Subscription Details</p>
                   <div className="table-head">
                         <div className="tablehead2"></div>
                         <p>Subscribers</p>  
                         <p className="total-batch-number">24</p>       
                   </div>
                   <table>
                    <tr>
                      <th>Pricing</th>
                      <th>Subscribers</th>
                    </tr>
                    <tr>
                       <td>399</td>
                       <td>20</td>
                    </tr>
                    <tr>
                       <td>999</td>
                       <td>04</td>
                    </tr>
                </table>
                <div className="table-bottom">
                         <p className="total-table-p">Total</p>  
                         <p className="total-table-number">24</p>       
                   </div>
          </div>
        </div>
        {/* //! */}
        <div className="Container" >
           <div  className="dashboard-batch">
                   <p className="dashboard-batch-p">Revenue</p>
                   <div className="table-head">
                         <div className="tablehead3"></div>
                         <p>Revenue</p>  
                         <p className="total-batch-number">8630.4</p>       
                   </div>
                   <table>
                     <tr>
                        <td>Total revenue of September 2022</td>
                        <td>21576</td>
                     </tr>
                     <tr>
                        <td>Amount after Tax deductions</td>
                        <td>17260.8</td>
                     </tr>
                </table>
                <div className="table-bottom">
                         <p className="total-table-p">Rvenue Share</p>  
                         <p className="total-table-number">50-50%</p>       
                   </div>
          </div>
        </div>
  </div>
  </div>
  );

}

export default Revenue;
