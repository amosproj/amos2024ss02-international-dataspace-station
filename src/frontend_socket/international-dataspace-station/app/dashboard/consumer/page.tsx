import {PhotoIcon} from "@heroicons/react/24/solid";
import users from '../../../data/users.json';
import {User} from "../../../data/interface/user";
import {cookies} from "next/headers";

export default function Page() {
    const userArray: User[] = users;
    const userCookie = cookies().get('user' as any)?.value;
    const loggedIn = JSON.parse(userCookie) as User;
    return (
        <main className="flex min-h-screen flex-col p-6">
            <form>
                <div className="border-b pb-8 border-gray-900/10">
                    <div className="space-y-10">
                        <div className="sm:col-span-3">
                            <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                                Connector
                            </label>
                            <div className="mt-2">
                                <select
                                    id="country"
                                    name="country"
                                    autoComplete="country-name"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                >
                                    {userArray && userArray.filter((u => u.role != loggedIn.role)).map( (u, index) => <option>{u.role}</option>)}
                                </select>
                            </div>
                        </div>
                        <div className="col-span-full">
                            <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
                                Attach file
                            </label>
                            <div
                                className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                                <div className="text-center">
                                    <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true"/>
                                    <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                        <label
                                            htmlFor="file-upload"
                                            className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                        >
                                            <span>Upload a file</span>
                                            <input id="file-upload" name="file-upload" type="file" className="sr-only"/>
                                        </label>
                                        <p className="pl-1">or drag and drop</p>
                                    </div>
                                    <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                                </div>
                            </div>
                        </div>
                        {/*<fieldset>*/}
                        {/*    <legend className="text-sm font-semibold leading-6 text-gray-900">By Email</legend>*/}
                        {/*    <div className="mt-6 space-y-6">*/}
                        {/*        <div className="relative flex gap-x-3">*/}
                        {/*            <div className="flex h-6 items-center">*/}
                        {/*                <input*/}
                        {/*                    id="comments"*/}
                        {/*                    name="comments"*/}
                        {/*                    type="checkbox"*/}
                        {/*                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"*/}
                        {/*                />*/}
                        {/*            </div>*/}
                        {/*            <div className="text-sm leading-6">*/}
                        {/*                <label htmlFor="comments" className="font-medium text-gray-900">*/}
                        {/*                    Comments*/}
                        {/*                </label>*/}
                        {/*                <p className="text-gray-500">Get notified when someones posts a comment on a*/}
                        {/*                    posting.</p>*/}
                        {/*            </div>*/}
                        {/*        </div>*/}
                        {/*        <div className="relative flex gap-x-3">*/}
                        {/*            <div className="flex h-6 items-center">*/}
                        {/*                <input*/}
                        {/*                    id="candidates"*/}
                        {/*                    name="candidates"*/}
                        {/*                    type="checkbox"*/}
                        {/*                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"*/}
                        {/*                />*/}
                        {/*            </div>*/}
                        {/*            <div className="text-sm leading-6">*/}
                        {/*                <label htmlFor="candidates" className="font-medium text-gray-900">*/}
                        {/*                    Candidates*/}
                        {/*                </label>*/}
                        {/*                <p className="text-gray-500">Get notified when a candidate applies for a*/}
                        {/*                    job.</p>*/}
                        {/*            </div>*/}
                        {/*        </div>*/}
                        {/*        <div className="relative flex gap-x-3">*/}
                        {/*            <div className="flex h-6 items-center">*/}
                        {/*                <input*/}
                        {/*                    id="offers"*/}
                        {/*                    name="offers"*/}
                        {/*                    type="checkbox"*/}
                        {/*                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"*/}
                        {/*                />*/}
                        {/*            </div>*/}
                        {/*            <div className="text-sm leading-6">*/}
                        {/*                <label htmlFor="offers" className="font-medium text-gray-900">*/}
                        {/*                    Offers*/}
                        {/*                </label>*/}
                        {/*                <p className="text-gray-500">Get notified when a candidate accepts or rejects an*/}
                        {/*                    offer.</p>*/}
                        {/*            </div>*/}
                        {/*        </div>*/}
                        {/*    </div>*/}
                        {/*</fieldset>*/}
                        {/*<fieldset>*/}
                        {/*    <legend className="text-sm font-semibold leading-6 text-gray-900">Push Notifications*/}
                        {/*    </legend>*/}
                        {/*    <p className="mt-1 text-sm leading-6 text-gray-600">These are delivered via SMS to your*/}
                        {/*        mobile phone.</p>*/}
                        {/*    <div className="mt-6 space-y-6">*/}
                        {/*        <div className="flex items-center gap-x-3">*/}
                        {/*            <input*/}
                        {/*                id="push-everything"*/}
                        {/*                name="push-notifications"*/}
                        {/*                type="radio"*/}
                        {/*                className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"*/}
                        {/*            />*/}
                        {/*            <label htmlFor="push-everything"*/}
                        {/*                   className="block text-sm font-medium leading-6 text-gray-900">*/}
                        {/*                Everything*/}
                        {/*            </label>*/}
                        {/*        </div>*/}
                        {/*        <div className="flex items-center gap-x-3">*/}
                        {/*            <input*/}
                        {/*                id="push-email"*/}
                        {/*                name="push-notifications"*/}
                        {/*                type="radio"*/}
                        {/*                className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"*/}
                        {/*            />*/}
                        {/*            <label htmlFor="push-email"*/}
                        {/*                   className="block text-sm font-medium leading-6 text-gray-900">*/}
                        {/*                Same as email*/}
                        {/*            </label>*/}
                        {/*        </div>*/}
                        {/*        <div className="flex items-center gap-x-3">*/}
                        {/*            <input*/}
                        {/*                id="push-nothing"*/}
                        {/*                name="push-notifications"*/}
                        {/*                type="radio"*/}
                        {/*                className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"*/}
                        {/*            />*/}
                        {/*            <label htmlFor="push-nothing"*/}
                        {/*                   className="block text-sm font-medium leading-6 text-gray-900">*/}
                        {/*                No push notifications*/}
                        {/*            </label>*/}
                        {/*        </div>*/}
                        {/*    </div>*/}
                        {/*</fieldset>*/}
                    </div>
                </div>

                <div className="mt-6 flex items-center justify-start gap-x-6">
                    <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Save
                    </button>
                </div>
            </form>
        </main>

    );
}