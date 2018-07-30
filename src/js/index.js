import angular from 'angular'

import appCtrl from './app/controllers'

import './jq'
import './main'

const appModule = angular.module('app', [appCtrl.name])

export default appModule
