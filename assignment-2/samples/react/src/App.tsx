import { useCallback } from "react";
import "./App.css";
import { useForm } from "react-hook-form";
import classNames from "classnames";

interface UserForm {
  name: string;
  email: string;
  zip:string;
  prefecture:string;
  address1:string;
  address2:string;
}

// 都道府県データ
const options = [
  {
    value:"東京都",
    label:"東京都",
  },
  {
    value:"沖縄県",
    label:"沖縄県",
  }
]

function App() {
  const {
    register,
    handleSubmit,
    formState: { errors,isValid }, 
  } = useForm<UserForm>({ mode: "onChange" }); 

  const handleClickSubmit = useCallback(
    async (request : UserForm) => {
      console.log("request===",request);

      const requestOptions ={
        method: 'POST',
        headers:{'Content-Type': 'application/json'},
        body: JSON.stringify({request})
      };

      const postResult = await fetch("https://httpstat.us/201",requestOptions)
      console.log("postResult===",postResult);
    },[]
  )

  return (
      <table  className="tableStyle">
        <tbody>
          <tr>        
              <td className="leftCell">氏名</td>
              <td className="rightCell">
                <input
                  className="form-input"
                  id="name"
                  type="text"
                  { ...register('name', { required: true }) }
                />
              </td>
          </tr>

          <tr className="rowStyle">             
              <td className="leftCell">Eメール</td>
              <td className="rightCell">
                <input
                  className={classNames("form-input", {"redOutLine": !!errors.email?.message})}
                  id="email"
                  type="text"
                  {...register("email", {
                    required: true,
                  pattern: {
                    value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: '正しいメールアドレスを入力して下さい',
                  },
                  })}
                />
              </td>
          </tr>
          <tr >
            <td className="errorleftCell"/>
            <td className="errorRightCell">
              <div className="errorMessage">
                  {errors.email?.message as React.ReactNode}
              </div>
            </td>
          </tr>

          <tr className="rowStyle">         
              <td className="leftCell">郵便番号</td>
              <td className="rightCell">
                <input
                  className={classNames("zipStyle", {"redOutLine": !!errors.zip?.message})}
                  id="zip"
                  type="text"
                  {...register("zip", {
                    required: true,
                    pattern: {
                      value: /^\d{7}$/,
                      message: 'ハイフンを含めず半角数字で入力してください',
                    },
                  })}
                />
              </td>
          </tr>
          <tr >
            <td className="errorleftCell"/>
            <td className="errorRightCell">
              <div className="errorMessage">
                  {errors.zip?.message as React.ReactNode}
              </div>
            </td>
          </tr>

          <tr className="rowStyle">         
              <td className="leftCell">都道府県</td>
              <td className="rightCell">
                <select id="prefecture"  className="selectStyle" {...register("prefecture")}>
                  {options.map(option => (
                    <option value={option.value} key={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </td>
          </tr>

          <tr className="rowStyle">         
              <td className="leftCell">市区町村・番地</td>
              <td className="rightCell">
                <input
                  className="form-input"
                  id="address1"
                  type="text"
                  { ...register('address1', { required: true }) }
                />
              </td>
          </tr>

          <tr className="rowStyle">       
              <td className="leftCell">建物名・号室</td>
              <td className="rightCell">
                <input
                  className="form-input"
                  id="address2"
                  type="text"
                  {...register("address2")}
                />
              </td>
          </tr>

          <tr>
            <td colSpan={2} className="buttonWrapper">
              <button 
                  type="submit" 
                  className="button" 
                  disabled={!isValid}
                  onClick={handleSubmit(handleClickSubmit)}>
                  登録
              </button>
            </td>
          </tr>

        </tbody>
      </table>
  );
}

export default App;