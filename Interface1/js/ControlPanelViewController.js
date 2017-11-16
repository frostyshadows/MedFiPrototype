function Uint8ToBase64(u8Arr) {
    var CHUNK_SIZE = 0x8000;
    var index = 0;
    var length = u8Arr.length;
    var result = '';
    var slice;
    while (index < length) {
        slice = u8Arr.subarray(index, Math.min(index + CHUNK_SIZE, length));
        result += String.fromCharCode.apply(null, slice);
        index += CHUNK_SIZE;
    }
    return btoa(result);
}
var InsightUBC;
(function (InsightUBC) {
    var ControlPanelViewController = (function () {
        function ControlPanelViewController($scope, $http) {
            this.$scope = $scope;
            this.$http = $http;
            globalControlPanelScope = this.$scope;
            this.$scope.viewController = this;
            this.cachedIdentifiers = [];
            this.isReady = false;
            this.modalAlert = document.getElementById("ResultSuccessModal");
            var closeSpan = document.getElementsByClassName("close")[0];
            var self = this;
            window.onclick = function (event) {
                if (event.target == self.modalAlert) {
                    self.modalAlert.style.display = "none";
                }
            };
            closeSpan.onclick = function (event) {
                self.modalAlert.style.display = "none";
            };
            this.getDataSetIdentifiers();
            $('#ControlPanelUpdateDataSetIdentifierSelect').on("show.bs.select", this.updateOptions);
            $('#ControlPanelDeleteDataSetIdentifierSelect').on("show.bs.select", this.updateOptions);
        }
        ControlPanelViewController.prototype.getDataSetIdentifiers = function () {
            var self = this;
            console.log("ScheduleViewController::getBuildings() Start the fetch the ids.");
            this.$http.get("http://127.0.0.1:4321/getDataSetIdentifiers").then(function (response) {
                var data = response.data;
                self.cachedIdentifiers = [];
                for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
                    var id = data_1[_i];
                    self.cachedIdentifiers.push(id);
                }
                self.isReady = true;
                console.log("ControlPanelViewController::getDataSetIdentifiers() All identifiers are fetched. isReady = " + self.isReady);
            }).catch(function (response) {
                console.log("ControlPanelViewController::getDataSetIdentifiers() Failed to fetch the ids. Error: " + response);
            });
        };
        ControlPanelViewController.prototype.updateOptions = function (event) {
            var self = globalControlPanelScope.viewController;
            if (self.isReady) {
                console.log("ControlPanelViewController::updateOptions() The ids list is now ready.");
                var select = event.target;
                for (var index = select.options.length - 1; index > 0; index--) {
                    select.remove(index);
                }
                for (var _i = 0, _a = self.cachedIdentifiers; _i < _a.length; _i++) {
                    var identifier = _a[_i];
                    var newOption = document.createElement("option");
                    newOption.text = identifier;
                    newOption.value = identifier;
                    select.appendChild(newOption);
                }
                $('.selectpicker').selectpicker('refresh');
            }
            else {
                console.error("ControlPanelViewController::updateOptions() The ids list is NOT ready.");
            }
        };
        ControlPanelViewController.prototype.read = function (file) {
            return new Promise(function (resolve) {
                var reader = new FileReader();
                reader.onloadend = function (event) {
                    var fileReader = event.target;
                    if (fileReader.readyState == fileReader.DONE) {
                        var arrayBuffer = fileReader.result;
                        console.log("ControlPanelViewController::read() Length = " + arrayBuffer.byteLength);
                        resolve(arrayBuffer);
                    }
                };
                reader.readAsArrayBuffer(file);
            });
        };
        ControlPanelViewController.prototype.upload = function (fileContent, toUrl) {
            var self = this;
            var buffer = new Uint8Array(fileContent);
            return new Promise(function (resolve, reject) {
                var base64 = Uint8ToBase64(buffer);
                var object = { "base64data": base64 };
                self.$http.put(toUrl, object)
                    .then(function (response) {
                    console.log("ControlPanelViewController::upload() THEN: Status = " + response.status);
                    console.log("ControlPanelViewController::upload() THEN: Data = " + response.data);
                    resolve(response.data.body);
                })
                    .catch(function (response) {
                    console.log("ControlPanelViewController::upload() CATCH: Status = " + response.status);
                    console.log("ControlPanelViewController::upload() CATCH: Data = " + response.data.message);
                    reject(response.data.body);
                });
            });
        };
        ControlPanelViewController.prototype.addDataSet = function (sender) {
            var identifierField = document.getElementById("ControlPanelAddDataSetIdentifierField");
            var identifier = identifierField.value;
            var fileInputField = document.getElementById("ControlPanelAddDataSetFileInputField");
            var file = fileInputField.files[0];
            var self = this;
            this.read(file)
                .then(function (content) {
                return self.upload(content, "http://127.0.0.1:4321/insight/" + identifier);
            })
                .then(function (response) {
                var modalBody = self.modalAlert.getElementsByClassName("modal-body")[0];
                modalBody.innerHTML = "<label>Selected data set has been added successfully.</label>";
                self.modalAlert.style.display = "block";
                self.getDataSetIdentifiers();
            })
                .catch(function (response) {
                alert("Failed to add selected data set. Error: " + response);
            });
        };
        ControlPanelViewController.prototype.updateDataSet = function (sender) {
            var identifierSelect = document.getElementById("ControlPanelUpdateDataSetIdentifierSelect");
            var selectedIdentifier = identifierSelect.options[identifierSelect.options.selectedIndex].value;
            var fileInputField = document.getElementById("ControlPanelUpdateDataSetFileInputField");
            var file = fileInputField.files[0];
            var self = this;
            this.read(file)
                .then(function (content) {
                return self.upload(content, "http://127.0.0.1:4321/insight/" + selectedIdentifier);
            })
                .then(function (response) {
                var modalBody = self.modalAlert.getElementsByClassName("modal-body")[0];
                modalBody.innerHTML = "<label>Selected data set has been updated successfully.</label>";
                self.modalAlert.style.display = "block";
            })
                .catch(function (response) {
                alert("Failed to update selected data set. Error: " + response);
            });
        };
        ControlPanelViewController.prototype.removeDataSet = function (sender) {
            var identifierSelect = document.getElementById("ControlPanelDeleteDataSetIdentifierSelect");
            var selectedIdentifier = identifierSelect.options[identifierSelect.options.selectedIndex].value;
            var self = this;
            this.$http.delete("http://127.0.0.1:4321/dataset/" + selectedIdentifier)
                .then(function (response) {
                var modalBody = self.modalAlert.getElementsByClassName("modal-body")[0];
                modalBody.innerHTML = "<label>Selected data set has been removed successfully.</label>";
                self.modalAlert.style.display = "block";
                self.getDataSetIdentifiers();
            })
                .catch(function (response) {
                alert("Failed to update selected data set. Error: " + response.data.body);
            });
        };
        return ControlPanelViewController;
    }());
    InsightUBC.ControlPanelViewController = ControlPanelViewController;
})(InsightUBC || (InsightUBC = {}));
//# sourceMappingURL=ControlPanelViewController.js.map