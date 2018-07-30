import angular from 'angular'
import moment from 'moment'

const appCtrl = angular
  .module('app.controllers', [])
  .controller('AppCtrl', ($scope, $http) => {
    $scope.done = false
    const serverData = {
      startDate: '20150827',
      members: [
        'e06c96ae-f160-4845-a46a-7e8e3a80ca49',
        '4d09a6b4-312d-4b36-a32f-250f01a35c0c',
        '77491ae7-de13-4a57-9145-b15bed6b9234',
        '8884bd7c-3584-4958-a88e-75e1d3612c86',
        '3b1a973b-d08c-4f46-9c7f-c2d1ea25ab8b',
        'dfe6fe75-ac80-4acf-98b0-79de6fce3f31'
      ]
    }

    $http
      .get('https://mcapi.ca/query/play.hexagonminecraft.com/info')
      .then(response => {
        $scope.status = response.data

        if ($scope.status.status) {
          $scope.isOnline = 'Online'
          $scope.onlineColor = {
            color: 'green'
          }
          $scope.done = true
        } else {
          $scope.isOnline = 'Offline'
          $scope.onlineColor = {
            color: 'red'
          }
          $scope.done = true
        }
      })
      .catch(err => {
        $scope.isOnline = 'Offline'
        $scope.onlineColor = {
          color: 'red'
        }
        $scope.status.players.online = '0'
        $scope.done = true
        console.log(err)
      })

    const momentStart = moment(serverData.startDate, 'YYYYMMDD').fromNow()
    $scope.startDate = momentStart.replace(/\D/g, '')
    $scope.memberCount = serverData.members.length
    $scope.members = {}

    const playApiBase = 'https://api.minetools.eu/uuid'
    angular.forEach(serverData.members, (value, key) => {
      const uuid = value.replace(/-/gi, '')
      $http.get(`${playApiBase}/${uuid}`).then(res => {
        $scope.members[res.data.name] = {
          name: res.data.name,
          uuid: value
        }
      })
    })
  })

export default appCtrl
