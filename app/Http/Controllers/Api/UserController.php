<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use App\Http\Middleware\Func;
use Validator;
use App\Models\OauthAccessToken;

class UserController extends Controller
{
    public $successStatus = 200;
    public $hidden = [
        'password',
        'remember_token'
    ];

    public function __construct()
    {
        // $this->middleware('auth:api', ['except' => ['store', 'listAll', 'list', 'login']]);
    }

    function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'ic' => 'required',
            'phone' => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json(['error'=>$validator->errors()], 401);
        }
        $input = $request->all();
        $input['password'] = bcrypt($input['ic']);
        $input['code'] = 0; // TODO: generate code

        $code = Func::generateStaffCode($input['ic']);
        $user = User::create($input);
        $input['code'] = $code . Func::addZeroString($user['id']);
        User::find($user['id'])->update($input);

        $success = $user->createToken('GCTSystem');
        return response()->json([
          'success' => [
            'user_id' => $user->id,
            'token' => $success->accessToken,
            'expires_at' => $success->token->expires_at,
            'status' => $this->successStatus
          ]
        ]);
    }

    function stores(Request $request)
    {
        $arr = $request->all();
        $users = [];
        foreach ($arr as $req) {
            $validator = Validator::make($req, [
                'name' => 'required',
                'ic' => 'required',
                'phone' => 'required',
            ]);
            if ($validator->fails()) {
                $users[] = response()->json(['error'=>$validator->errors()], 401);
                continue;
            }
            $input = $req;
            $input['password'] = bcrypt($input['ic']);
            $input['code'] = 0;

            $code = Func::generateStaffCode($input['ic']);
            $user = User::create($input);
            $input['code'] = $code . Func::addZeroString($user['id']);
            User::find($user['id'])->update($input);

            $success = $user->createToken('GCTSystem');
            $users[] = response()->json([
              'success' => [
                'user_id' => $user->id,
                'token' => $success->accessToken,
                'expires_at' => $success->token->expires_at,
                'status' => $this->successStatus
              ]
            ]);
        }
        return $users;
    }

    function listAll()
    {
        $columns = \Schema::getColumnListing('users');
        $cols = array_map(function($var) {
            return !in_array($var, $this->hidden) ? $var : null;
        }, $columns);
        $columns = [];
        foreach ($cols as $col) {
            if ($col != null) {
                $columns[] = $col;
            }
        }
        $rows = User::all();
        return array(
            'columns' => $columns,
            'data' => $rows
        );
    }

    function list($id)
    {
        return User::get()->find($id);
    }

    function login()
    {
        if (Auth::attempt(['code' => request('code'), 'password' => request('ic')])) {
            $user = Auth::user();
            OauthAccessToken::where(['user_id'=>$user['id']])->delete();
            Auth::logout();
            $success = $user->createToken('GCTSystem');
            return response()->json([
                'success' => [
                    'user_id' => $user->id,
                    'token' => $success->accessToken,
                    'expires_at' => $success->token->expires_at
                ]
            ],
            $this->successStatus);
        }
        else {
            return response()->json([
                'error'=>'Unauthorised'
            ],
            401);
        }
    }

    function logout(Request $request)
    {
        $user_id = $request->all()['user_id'];
        OauthAccessToken::where(['user_id'=>$user_id])->delete();
        return response()->json([
            'message' => 'Successfully logged out'
        ]);
    }

    function remove($id)
    {
        $user = User::find($id);
        if ($user != null) {
            OauthAccessToken::where(['user_id'=>$user['id']])->delete();
            $user->delete();
            return response()->json(['status'=>200]);
        } else {
            return response()->json(['status'=>404]);
        }
    }

    function edit(Request $request, $id)
    {
        $user = User::find($id);
        if ($user != null) {
            OauthAccessToken::where(['user_id'=>$user['id']])->delete();
            $input = $request->all();
            $code = Func::generateStaffCode($input['ic']);
            $input['password'] = bcrypt($input['ic']);
            $input['code'] = $code . Func::addZeroString($user['id']);
            $user->update($input);
            return response()->json(['status'=>200]);
        } else {
            return response()->json(['status'=>404]);
        }
    }
}
