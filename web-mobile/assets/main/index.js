System.register("chunks:///_virtual/BallController.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './BrickBase.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, CCFloat, Vec2, Collider2D, Contact2DType, RigidBody2D, Vec3, Component, BrickBase;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      CCFloat = module.CCFloat;
      Vec2 = module.Vec2;
      Collider2D = module.Collider2D;
      Contact2DType = module.Contact2DType;
      RigidBody2D = module.RigidBody2D;
      Vec3 = module.Vec3;
      Component = module.Component;
    }, function (module) {
      BrickBase = module.BrickBase;
    }],
    execute: function () {
      var _dec, _dec2, _class, _class2, _descriptor;

      cclegacy._RF.push({}, "f6e94l2xWxIBZlW/BVpPQLg", "BallController", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var BallController = exports('BallController', (_dec = ccclass('BallController'), _dec2 = property({
        type: CCFloat
      }), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(BallController, _Component);

        function BallController() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "speed", _descriptor, _assertThisInitialized(_this));

          _this.cooldown = 0;
          _this.vel = Vec2.ZERO;
          return _this;
        }

        var _proto = BallController.prototype;

        _proto.start = function start() {
          var collider = this.getComponent(Collider2D);
          collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
          collider.on(Contact2DType.END_CONTACT, this.onEndContact, this);
        };

        _proto.onEnable = function onEnable() {
          console.log(this.getComponent(RigidBody2D).linearVelocity);
          var vel = this.getComponent(RigidBody2D).linearVelocity.normalize().multiplyScalar(this.speed);
          this.getComponent(RigidBody2D).linearVelocity = vel;
        };

        _proto.onBeginContact = function onBeginContact(selfCollider, otherCollider, contact) {
          if (otherCollider.group == 1 << 1) {
            this.vel = selfCollider.body.linearVelocity;
          }
        };

        _proto.onEndContact = function onEndContact(selfCollider, otherCollider, contact) {
          if (otherCollider.group == 1 << 1 && this.cooldown < 0) {
            var a = this.vel.clone().normalize();
            var b = selfCollider.body.linearVelocity.clone().normalize();
            if (a.dot(b) > .98) return; //this.hit();

            this.cooldown = .01;
            /*setTimeout(() => {
                otherCollider.node.destroy();
            }, 1);*/

            otherCollider.getComponent(BrickBase).onHit(this);
          }
        };

        _proto.update = function update(deltaTime) {
          this.cooldown -= deltaTime;
        };

        _proto.hit = function hit() {
          this.node.scale = new Vec3(.8, .8, 1); //tween(this.node).to(.07, { scale: new Vec3(1, 1, 1) }, {easing: "backIn"} ).start();
        };

        return BallController;
      }(Component), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "speed", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/BallPathDisplayer.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Prefab, CCInteger, CCFloat, instantiate, Sprite, Vec2, PhysicsSystem2D, ERaycast2DType, Color, Component;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Prefab = module.Prefab;
      CCInteger = module.CCInteger;
      CCFloat = module.CCFloat;
      instantiate = module.instantiate;
      Sprite = module.Sprite;
      Vec2 = module.Vec2;
      PhysicsSystem2D = module.PhysicsSystem2D;
      ERaycast2DType = module.ERaycast2DType;
      Color = module.Color;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4;

      cclegacy._RF.push({}, "77244GwApBBR75TJjQvwC/T", "BallPathDisplayer", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var BallPathDisplayer = exports('BallPathDisplayer', (_dec = ccclass('BallPathDisplayer'), _dec2 = property({
        type: Prefab
      }), _dec3 = property({
        type: CCInteger
      }), _dec4 = property({
        type: CCFloat
      }), _dec5 = property({
        type: CCInteger
      }), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(BallPathDisplayer, _Component);

        function BallPathDisplayer() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "pathPrefab", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "steps", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "distStep", _descriptor3, _assertThisInitialized(_this));

          _this.step = void 0;
          _this.path = new Array();
          _this.pathNode = void 0;

          _initializerDefineProperty(_this, "reflections", _descriptor4, _assertThisInitialized(_this));

          return _this;
        }

        var _proto = BallPathDisplayer.prototype;

        _proto.onLoad = function onLoad() {
          this.pathNode = this.node.getChildByName("path");

          for (var i = 0; i < this.steps; i++) {
            var step = instantiate(this.pathPrefab).getComponent(Sprite);
            this.path.push(step);
            step.node.setParent(this.pathNode);
          }
        };

        _proto.onEnable = function onEnable() {
          this.pathNode.active = true;
        };

        _proto.onDisable = function onDisable() {
          this.pathNode.active = false;
        };

        _proto.reflect = function reflect(vec, norm) {
          var res = new Vec2();
          res.set(vec);
          res.subtract(norm.clone().multiplyScalar(2 * Vec2.dot(vec, norm)));
          return res;
        };

        _proto.checkPath = function checkPath(start, dir) {
          this.clearSegments();

          for (var i = 0; i < this.reflections; i++) {
            var raycast = PhysicsSystem2D.instance.raycast(start, start.clone().add(dir.clone().multiplyScalar(1000)), ERaycast2DType.Closest);

            if (raycast.length > 0) {
              var col = raycast[0];
              var steps = Math.round(Vec2.distance(start, col.point) / this.distStep);
              this.drawSegment(start, col.point, steps);
              dir = this.reflect(dir, col.normal);
              start = col.point; //console.log(col.normal);
            }
          }
        };

        _proto.clearSegments = function clearSegments() {
          this.step = 0;

          for (var i = 0; i < this.steps; i++) {
            this.path[i].enabled = false;
          }
        };

        _proto.drawSegment = function drawSegment(a, b, steps) {
          var c = new Vec2();

          for (var i = this.step; i < Math.min(this.steps, this.step + steps); i++) {
            Vec2.lerp(c, a, b, (i - this.step + 1) / steps);
            this.path[i].enabled = true;
            this.path[i].node.setWorldPosition(c.x, c.y, 0);
            var opacity = 1 - Math.max(0, (i - 3) / this.steps);
            this.path[i].color = new Color(255, 255, 255, 255 * opacity);
          }

          this.step += steps;
        };

        return BallPathDisplayer;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "pathPrefab", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "steps", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "distStep", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "reflections", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/BrickBase.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, CCBoolean, Component;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      CCBoolean = module.CCBoolean;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _class, _class2, _descriptor;

      cclegacy._RF.push({}, "3357ccjEvBAAKTvvtj7eqYb", "BrickBase", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var BrickBase = exports('BrickBase', (_dec = ccclass('BrickBase'), _dec2 = property({
        type: CCBoolean
      }), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(BrickBase, _Component);

        function BrickBase() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "skipable", _descriptor, _assertThisInitialized(_this));

          _this.outer = void 0;
          return _this;
        }

        var _proto = BrickBase.prototype;

        _proto.onHit = function onHit(ball) {
          var _this2 = this;

          setTimeout(function () {
            _this2.node.destroy();
          }, 1);
        };

        _proto.onDestroy = function onDestroy() {
          this.outer.destroy();
        };

        return BrickBase;
      }(Component), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "skipable", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/BrickMetal.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './BrickBase.ts'], function (exports) {
  var _inheritsLoose, cclegacy, _decorator, tween, Vec3, BrickBase;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      tween = module.tween;
      Vec3 = module.Vec3;
    }, function (module) {
      BrickBase = module.BrickBase;
    }],
    execute: function () {
      var _dec, _class;

      cclegacy._RF.push({}, "bda7ceXdqlPTI0kCCh5l2//", "BrickMetal", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var BrickMetal = exports('BrickMetal', (_dec = ccclass('BrickMetal'), _dec(_class = /*#__PURE__*/function (_BrickBase) {
        _inheritsLoose(BrickMetal, _BrickBase);

        function BrickMetal() {
          return _BrickBase.apply(this, arguments) || this;
        }

        var _proto = BrickMetal.prototype;

        _proto.onHit = function onHit(ball) {
          var scale = .9;
          this.node.setScale(scale, scale, scale);
          this.outer.setScale(scale, scale, scale);
          tween(this.node).to(.1, {
            scale: new Vec3(1, 1, 1)
          }, {
            easing: "backIn"
          }).start();
          tween(this.outer).to(.1, {
            scale: new Vec3(1, 1, 1)
          }, {
            easing: "backIn"
          }).start();
        };

        return BrickMetal;
      }(BrickBase)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/debug-view-runtime-control.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Node, Color, Canvas, UITransform, instantiate, Label, RichText, Toggle, Button, director, Component;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Node = module.Node;
      Color = module.Color;
      Canvas = module.Canvas;
      UITransform = module.UITransform;
      instantiate = module.instantiate;
      Label = module.Label;
      RichText = module.RichText;
      Toggle = module.Toggle;
      Button = module.Button;
      director = module.director;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3;

      cclegacy._RF.push({}, "b2bd1+njXxJxaFY3ymm06WU", "debug-view-runtime-control", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var DebugViewRuntimeControl = exports('DebugViewRuntimeControl', (_dec = ccclass('internal.DebugViewRuntimeControl'), _dec2 = property(Node), _dec3 = property(Node), _dec4 = property(Node), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(DebugViewRuntimeControl, _Component);

        function DebugViewRuntimeControl() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "compositeModeToggle", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "singleModeToggle", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "EnableAllCompositeModeButton", _descriptor3, _assertThisInitialized(_this));

          _this._single = 0;
          _this.strSingle = ['No Single Debug', 'Vertex Color', 'Vertex Normal', 'Vertex Tangent', 'World Position', 'Vertex Mirror', 'Face Side', 'UV0', 'UV1', 'UV Lightmap', 'Project Depth', 'Linear Depth', 'Fragment Normal', 'Fragment Tangent', 'Fragment Binormal', 'Base Color', 'Diffuse Color', 'Specular Color', 'Transparency', 'Metallic', 'Roughness', 'Specular Intensity', 'IOR', 'Direct Diffuse', 'Direct Specular', 'Direct All', 'Env Diffuse', 'Env Specular', 'Env All', 'Emissive', 'Light Map', 'Shadow', 'AO', 'Fresnel', 'Direct Transmit Diffuse', 'Direct Transmit Specular', 'Env Transmit Diffuse', 'Env Transmit Specular', 'Transmit All', 'Direct Internal Specular', 'Env Internal Specular', 'Internal All', 'Fog'];
          _this.strComposite = ['Direct Diffuse', 'Direct Specular', 'Env Diffuse', 'Env Specular', 'Emissive', 'Light Map', 'Shadow', 'AO', 'Normal Map', 'Fog', 'Tone Mapping', 'Gamma Correction', 'Fresnel', 'Transmit Diffuse', 'Transmit Specular', 'Internal Specular', 'TT'];
          _this.strMisc = ['CSM Layer Coloration', 'Lighting With Albedo'];
          _this.compositeModeToggleList = [];
          _this.singleModeToggleList = [];
          _this.miscModeToggleList = [];
          _this.textComponentList = [];
          _this.labelComponentList = [];
          _this.textContentList = [];
          _this.hideButtonLabel = void 0;
          _this._currentColorIndex = 0;
          _this.strColor = ['<color=#ffffff>', '<color=#000000>', '<color=#ff0000>', '<color=#00ff00>', '<color=#0000ff>'];
          _this.color = [Color.WHITE, Color.BLACK, Color.RED, Color.GREEN, Color.BLUE];
          return _this;
        }

        var _proto = DebugViewRuntimeControl.prototype;

        _proto.start = function start() {
          // get canvas resolution
          var canvas = this.node.parent.getComponent(Canvas);

          if (!canvas) {
            console.error('debug-view-runtime-control should be child of Canvas');
            return;
          }

          var uiTransform = this.node.parent.getComponent(UITransform);
          var halfScreenWidth = uiTransform.width * 0.5;
          var halfScreenHeight = uiTransform.height * 0.5;
          var x = -halfScreenWidth + halfScreenWidth * 0.1,
              y = halfScreenHeight - halfScreenHeight * 0.1;
          var width = 200,
              height = 20; // new nodes

          var miscNode = this.node.getChildByName('MiscMode');
          var buttonNode = instantiate(miscNode);
          buttonNode.parent = this.node;
          buttonNode.name = 'Buttons';
          var titleNode = instantiate(miscNode);
          titleNode.parent = this.node;
          titleNode.name = 'Titles'; // title

          for (var i = 0; i < 2; i++) {
            var newLabel = instantiate(this.EnableAllCompositeModeButton.getChildByName('Label'));
            newLabel.setPosition(x + (i > 0 ? 50 + width * 2 : 150), y, 0.0);
            newLabel.setScale(0.75, 0.75, 0.75);
            newLabel.parent = titleNode;

            var _labelComponent = newLabel.getComponent(Label);

            _labelComponent.string = i ? '----------Composite Mode----------' : '----------Single Mode----------';
            _labelComponent.color = Color.WHITE;
            _labelComponent.overflow = 0;
            this.labelComponentList[this.labelComponentList.length] = _labelComponent;
          }

          y -= height; // single

          var currentRow = 0;

          for (var _i = 0; _i < this.strSingle.length; _i++, currentRow++) {
            if (_i === this.strSingle.length >> 1) {
              x += width;
              currentRow = 0;
            }

            var newNode = _i ? instantiate(this.singleModeToggle) : this.singleModeToggle;
            newNode.setPosition(x, y - height * currentRow, 0.0);
            newNode.setScale(0.5, 0.5, 0.5);
            newNode.parent = this.singleModeToggle.parent;
            var textComponent = newNode.getComponentInChildren(RichText);
            textComponent.string = this.strSingle[_i];
            this.textComponentList[this.textComponentList.length] = textComponent;
            this.textContentList[this.textContentList.length] = textComponent.string;
            newNode.on(Toggle.EventType.TOGGLE, this.toggleSingleMode, this);
            this.singleModeToggleList[_i] = newNode;
          }

          x += width; // buttons

          this.EnableAllCompositeModeButton.setPosition(x + 15, y, 0.0);
          this.EnableAllCompositeModeButton.setScale(0.5, 0.5, 0.5);
          this.EnableAllCompositeModeButton.on(Button.EventType.CLICK, this.enableAllCompositeMode, this);
          this.EnableAllCompositeModeButton.parent = buttonNode;
          var labelComponent = this.EnableAllCompositeModeButton.getComponentInChildren(Label);
          this.labelComponentList[this.labelComponentList.length] = labelComponent;
          var changeColorButton = instantiate(this.EnableAllCompositeModeButton);
          changeColorButton.setPosition(x + 90, y, 0.0);
          changeColorButton.setScale(0.5, 0.5, 0.5);
          changeColorButton.on(Button.EventType.CLICK, this.changeTextColor, this);
          changeColorButton.parent = buttonNode;
          labelComponent = changeColorButton.getComponentInChildren(Label);
          labelComponent.string = 'TextColor';
          this.labelComponentList[this.labelComponentList.length] = labelComponent;
          var HideButton = instantiate(this.EnableAllCompositeModeButton);
          HideButton.setPosition(x + 200, y, 0.0);
          HideButton.setScale(0.5, 0.5, 0.5);
          HideButton.on(Button.EventType.CLICK, this.hideUI, this);
          HideButton.parent = this.node.parent;
          labelComponent = HideButton.getComponentInChildren(Label);
          labelComponent.string = 'Hide UI';
          this.labelComponentList[this.labelComponentList.length] = labelComponent;
          this.hideButtonLabel = labelComponent; // misc

          y -= 40;

          for (var _i2 = 0; _i2 < this.strMisc.length; _i2++) {
            var _newNode = instantiate(this.compositeModeToggle);

            _newNode.setPosition(x, y - height * _i2, 0.0);

            _newNode.setScale(0.5, 0.5, 0.5);

            _newNode.parent = miscNode;

            var _textComponent = _newNode.getComponentInChildren(RichText);

            _textComponent.string = this.strMisc[_i2];
            this.textComponentList[this.textComponentList.length] = _textComponent;
            this.textContentList[this.textContentList.length] = _textComponent.string;

            var toggleComponent = _newNode.getComponent(Toggle);

            toggleComponent.isChecked = _i2 ? true : false;

            _newNode.on(Toggle.EventType.TOGGLE, _i2 ? this.toggleLightingWithAlbedo : this.toggleCSMColoration, this);

            this.miscModeToggleList[_i2] = _newNode;
          } // composite


          y -= 150;

          for (var _i3 = 0; _i3 < this.strComposite.length; _i3++) {
            var _newNode2 = _i3 ? instantiate(this.compositeModeToggle) : this.compositeModeToggle;

            _newNode2.setPosition(x, y - height * _i3, 0.0);

            _newNode2.setScale(0.5, 0.5, 0.5);

            _newNode2.parent = this.compositeModeToggle.parent;

            var _textComponent2 = _newNode2.getComponentInChildren(RichText);

            _textComponent2.string = this.strComposite[_i3];
            this.textComponentList[this.textComponentList.length] = _textComponent2;
            this.textContentList[this.textContentList.length] = _textComponent2.string;

            _newNode2.on(Toggle.EventType.TOGGLE, this.toggleCompositeMode, this);

            this.compositeModeToggleList[_i3] = _newNode2;
          }
        };

        _proto.isTextMatched = function isTextMatched(textUI, textDescription) {
          var tempText = new String(textUI);
          var findIndex = tempText.search('>');

          if (findIndex === -1) {
            return textUI === textDescription;
          } else {
            tempText = tempText.substr(findIndex + 1);
            tempText = tempText.substr(0, tempText.search('<'));
            return tempText === textDescription;
          }
        };

        _proto.toggleSingleMode = function toggleSingleMode(toggle) {
          var debugView = director.root.debugView;
          var textComponent = toggle.getComponentInChildren(RichText);

          for (var i = 0; i < this.strSingle.length; i++) {
            if (this.isTextMatched(textComponent.string, this.strSingle[i])) {
              debugView.singleMode = i;
            }
          }
        };

        _proto.toggleCompositeMode = function toggleCompositeMode(toggle) {
          var debugView = director.root.debugView;
          var textComponent = toggle.getComponentInChildren(RichText);

          for (var i = 0; i < this.strComposite.length; i++) {
            if (this.isTextMatched(textComponent.string, this.strComposite[i])) {
              debugView.enableCompositeMode(i, toggle.isChecked);
            }
          }
        };

        _proto.toggleLightingWithAlbedo = function toggleLightingWithAlbedo(toggle) {
          var debugView = director.root.debugView;
          debugView.lightingWithAlbedo = toggle.isChecked;
        };

        _proto.toggleCSMColoration = function toggleCSMColoration(toggle) {
          var debugView = director.root.debugView;
          debugView.csmLayerColoration = toggle.isChecked;
        };

        _proto.enableAllCompositeMode = function enableAllCompositeMode(button) {
          var debugView = director.root.debugView;
          debugView.enableAllCompositeMode(true);

          for (var i = 0; i < this.compositeModeToggleList.length; i++) {
            var _toggleComponent = this.compositeModeToggleList[i].getComponent(Toggle);

            _toggleComponent.isChecked = true;
          }

          var toggleComponent = this.miscModeToggleList[0].getComponent(Toggle);
          toggleComponent.isChecked = false;
          debugView.csmLayerColoration = false;
          toggleComponent = this.miscModeToggleList[1].getComponent(Toggle);
          toggleComponent.isChecked = true;
          debugView.lightingWithAlbedo = true;
        };

        _proto.hideUI = function hideUI(button) {
          var titleNode = this.node.getChildByName('Titles');
          var activeValue = !titleNode.active;
          this.singleModeToggleList[0].parent.active = activeValue;
          this.miscModeToggleList[0].parent.active = activeValue;
          this.compositeModeToggleList[0].parent.active = activeValue;
          this.EnableAllCompositeModeButton.parent.active = activeValue;
          titleNode.active = activeValue;
          this.hideButtonLabel.string = activeValue ? 'Hide UI' : 'Show UI';
        };

        _proto.changeTextColor = function changeTextColor(button) {
          this._currentColorIndex++;

          if (this._currentColorIndex >= this.strColor.length) {
            this._currentColorIndex = 0;
          }

          for (var i = 0; i < this.textComponentList.length; i++) {
            this.textComponentList[i].string = this.strColor[this._currentColorIndex] + this.textContentList[i] + '</color>';
          }

          for (var _i4 = 0; _i4 < this.labelComponentList.length; _i4++) {
            this.labelComponentList[_i4].color = this.color[this._currentColorIndex];
          }
        };

        _proto.onLoad = function onLoad() {};

        _proto.update = function update(deltaTime) {};

        return DebugViewRuntimeControl;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "compositeModeToggle", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "singleModeToggle", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "EnableAllCompositeModeButton", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/GameManager.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './PlayerBaseController.ts', './PlayerThrowController.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Node, Component, PlayerBaseController, PlayerThrowController;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Node = module.Node;
      Component = module.Component;
    }, function (module) {
      PlayerBaseController = module.PlayerBaseController;
    }, function (module) {
      PlayerThrowController = module.PlayerThrowController;
    }],
    execute: function () {
      var _dec, _dec2, _class, _class2, _descriptor;

      cclegacy._RF.push({}, "1068cbaEbtLgrTiiq1XFlT9", "GameManager", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;

      var GameState = /*#__PURE__*/function (GameState) {
        GameState[GameState["Targeting"] = 0] = "Targeting";
        GameState[GameState["Base"] = 1] = "Base";
        GameState[GameState["Loading"] = 2] = "Loading";
        return GameState;
      }(GameState || {});

      var GameManager = exports('GameManager', (_dec = ccclass('GameManager'), _dec2 = property({
        type: Node
      }), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(GameManager, _Component);

        function GameManager() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _this.state = GameState.Targeting;

          _initializerDefineProperty(_this, "player", _descriptor, _assertThisInitialized(_this));

          return _this;
        }

        var _proto = GameManager.prototype;

        _proto.start = function start() {
          this.enterTargeting();
          this.player.on("throw", this.enterBase, this);
        };

        _proto.update = function update(deltaTime) {};

        _proto.enterTargeting = function enterTargeting() {
          this.state = GameState.Targeting;
          this.player.getComponent(PlayerBaseController).enabled = false;
          this.player.getComponent(PlayerThrowController).enabled = true;
        };

        _proto.enterBase = function enterBase() {
          this.state = GameState.Base;
          this.player.getComponent(PlayerBaseController).enabled = true;
          this.player.getComponent(PlayerThrowController).enabled = false;
        };

        return GameManager;
      }(Component), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "player", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/GridController.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './BrickBase.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Prefab, Vec2, CCInteger, instantiate, randomRangeInt, Vec3, Component, BrickBase;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Prefab = module.Prefab;
      Vec2 = module.Vec2;
      CCInteger = module.CCInteger;
      instantiate = module.instantiate;
      randomRangeInt = module.randomRangeInt;
      Vec3 = module.Vec3;
      Component = module.Component;
    }, function (module) {
      BrickBase = module.BrickBase;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6;

      cclegacy._RF.push({}, "5cecfas2ehHgb5OPe30+6PH", "GridController", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var GridController = exports('GridController', (_dec = ccclass('GridSpawner'), _dec2 = property({
        type: Prefab
      }), _dec3 = property({
        type: Prefab
      }), _dec4 = property({
        type: Prefab
      }), _dec5 = property({
        type: Vec2
      }), _dec6 = property({
        type: CCInteger
      }), _dec7 = property({
        type: CCInteger
      }), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(GridController, _Component);

        function GridController() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "outer", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "simple", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "metal", _descriptor3, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "offset", _descriptor4, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "width", _descriptor5, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "height", _descriptor6, _assertThisInitialized(_this));

          _this.bricks = void 0;
          _this.outers = void 0;
          return _this;
        }

        var _proto = GridController.prototype;

        _proto.start = function start() {
          //
          this.bricks = this.node.getChildByName("bricks");
          this.outers = this.node.getChildByName("outers"); //

          var off = -(this.width - 1) * this.offset.x / 2;

          for (var x = 0; x < this.width; x++) {
            for (var y = 0; y < this.height; y++) {
              var brick = instantiate(randomRangeInt(0, 10 + 1) > 2 ? this.simple : this.metal);
              var outer = instantiate(this.outer);
              brick.setPosition(new Vec3(x * this.offset.x + off, y * this.offset.y, 1));
              outer.setPosition(brick.position);
              brick.parent = this.bricks;
              outer.parent = this.outers;
              brick.getComponent(BrickBase).outer = outer;
            }
          }
        };

        _proto.update = function update(deltaTime) {};

        return GridController;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "outer", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "simple", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "metal", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "offset", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "width", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "height", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/main", ['./debug-view-runtime-control.ts', './BallController.ts', './BallPathDisplayer.ts', './GameManager.ts', './GridController.ts', './PlayerBaseController.ts', './PlayerThrowController.ts', './BrickBase.ts', './BrickMetal.ts'], function () {
  return {
    setters: [null, null, null, null, null, null, null, null, null],
    execute: function () {}
  };
});

System.register("chunks:///_virtual/PlayerBaseController.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './BallController.ts'], function (exports) {
  var _inheritsLoose, cclegacy, _decorator, Collider2D, Contact2DType, input, Input, lerp, Component, BallController;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Collider2D = module.Collider2D;
      Contact2DType = module.Contact2DType;
      input = module.input;
      Input = module.Input;
      lerp = module.lerp;
      Component = module.Component;
    }, function (module) {
      BallController = module.BallController;
    }],
    execute: function () {
      var _dec, _class;

      cclegacy._RF.push({}, "31fb0gBM1JP95Oc5bdkvF+Z", "PlayerBaseController", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var PlayerBaseController = exports('PlayerBaseController', (_dec = ccclass('PlayerBaseController'), _dec(_class = /*#__PURE__*/function (_Component) {
        _inheritsLoose(PlayerBaseController, _Component);

        function PlayerBaseController() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _this.control = true;
          _this.target = 0;
          return _this;
        }

        var _proto = PlayerBaseController.prototype;

        _proto.start = function start() {};

        _proto.onEnable = function onEnable() {
          var collider = this.getComponent(Collider2D);
          collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
          input.on(Input.EventType.TOUCH_MOVE, this.onTouchMove, this);
        };

        _proto.onDisable = function onDisable() {
          var collider = this.getComponent(Collider2D);
          collider.off(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
          input.off(Input.EventType.TOUCH_MOVE, this.onTouchMove, this);
        };

        _proto.onBeginContact = function onBeginContact(selfCollider, otherCollider, contact) {
          if (!this.control) return;

          if (otherCollider.group == 1 << 2) {
            contact.disabled = true;
            var ball = otherCollider.node.getComponent(BallController);
            var dir = -selfCollider.node.position.x + otherCollider.node.position.x;
            var vel = otherCollider.body.linearVelocity;
            vel.y *= -1;
            vel.x = dir * 0.3;
            vel.normalize();
            vel = vel.multiplyScalar(ball.speed);
            otherCollider.body.linearVelocity = vel;
          }
        };

        _proto.update = function update(deltaTime) {
          var next = this.node.position;
          next.x = lerp(next.x, this.target, .4);
          this.node.setPosition(next);
        };

        _proto.onTouchMove = function onTouchMove(event) {
          this.target += event.getUIDelta().x; //event.getLocationX()*2 - 1280/2;
        };

        return PlayerBaseController;
      }(Component)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/PlayerThrowController.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './BallController.ts', './BallPathDisplayer.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Prefab, instantiate, Vec3, input, Input, Vec2, RigidBody2D, Component, BallController, BallPathDisplayer;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Prefab = module.Prefab;
      instantiate = module.instantiate;
      Vec3 = module.Vec3;
      input = module.input;
      Input = module.Input;
      Vec2 = module.Vec2;
      RigidBody2D = module.RigidBody2D;
      Component = module.Component;
    }, function (module) {
      BallController = module.BallController;
    }, function (module) {
      BallPathDisplayer = module.BallPathDisplayer;
    }],
    execute: function () {
      var _dec, _dec2, _class, _class2, _descriptor;

      cclegacy._RF.push({}, "627e2XIw1hBTqA1qfPZ4p7D", "PlayerThrowController", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var PlayerThrowController = exports('PlayerThrowController', (_dec = ccclass('PlayerThrowController'), _dec2 = property({
        type: Prefab
      }), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(PlayerThrowController, _Component);

        function PlayerThrowController() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "ballPrefab", _descriptor, _assertThisInitialized(_this));

          _this.ball = void 0;
          _this.pathRenderer = void 0;
          return _this;
        }

        var _proto = PlayerThrowController.prototype;

        _proto.onLoad = function onLoad() {
          this.pathRenderer = this.getComponent(BallPathDisplayer);
        };

        _proto.onEnable = function onEnable() {
          this.ball = instantiate(this.ballPrefab);
          this.ball.position = this.node.position.clone().add(new Vec3(0, 30, 0));
          this.ball.parent = this.node.getParent();
          this.ball.getComponent(BallController).enabled = false;
          input.on(Input.EventType.TOUCH_END, this.onTouchEnd, this);
          input.on(Input.EventType.TOUCH_START, this.onTouchUpdate, this);
          input.on(Input.EventType.TOUCH_MOVE, this.onTouchUpdate, this);
          this.pathRenderer.enabled = true;
        };

        _proto.onDisable = function onDisable() {
          input.off(Input.EventType.TOUCH_END, this.onTouchEnd, this);
          input.off(Input.EventType.TOUCH_START, this.onTouchUpdate, this);
          input.off(Input.EventType.TOUCH_MOVE, this.onTouchUpdate, this);
          this.pathRenderer.enabled = false;
        };

        _proto.onTouchUpdate = function onTouchUpdate(event) {
          var touch = event.getUILocation();
          var target = new Vec2(this.ball.worldPosition.x, this.ball.worldPosition.y);
          var dir = touch.subtract(target).normalize(); //this.pathRenderer.point = new Vec2(this.ball.worldPosition.x, this.ball.worldPosition.y);
          //this.pathRenderer.dir = dir;

          this.pathRenderer.checkPath(new Vec2(this.ball.worldPosition.x, this.ball.worldPosition.y), dir);
        };

        _proto.onTouchEnd = function onTouchEnd(event) {
          var touch = event.getUILocation();
          var target = new Vec2(this.ball.worldPosition.x, this.ball.worldPosition.y);
          var dir = touch.subtract(target).normalize();
          this.ball.getComponent(RigidBody2D).linearVelocity = dir;
          this.ball.getComponent(BallController).enabled = true;
          this.node.emit("throw");
        };

        return PlayerThrowController;
      }(Component), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "ballPrefab", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

(function(r) {
  r('virtual:///prerequisite-imports/main', 'chunks:///_virtual/main'); 
})(function(mid, cid) {
    System.register(mid, [cid], function (_export, _context) {
    return {
        setters: [function(_m) {
            var _exportObj = {};

            for (var _key in _m) {
              if (_key !== "default" && _key !== "__esModule") _exportObj[_key] = _m[_key];
            }
      
            _export(_exportObj);
        }],
        execute: function () { }
    };
    });
});