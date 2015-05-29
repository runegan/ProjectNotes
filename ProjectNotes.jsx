/*
ProjectNotes - Create notes for your After Effect projects
http://github.com/runegan/ProjectNotes/
Copyright (C) 2015  Rune Gangsø
http://runegang.so

  ProjectNotes is free software: you can redistribute it and/or modify
  it under the terms of the GNU General Public License as published by
  the Free Software Foundation, either version 3 of the License, or
  (at your option) any later version.

  ProjectNotes is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  GNU General Public License for more details.

  You should have received a copy of the GNU General Public License
  along with this program.  If not, see <http://www.gnu.org/licenses/>.

---
Icons made by Freepik from <http://www.flaticon.com> is licensed
under CC BY 3.0 <http://creativecommons.org/licenses/by/3.0/>
*/

(function ProjectNotes(thisObj) {

  // Globals
  var scriptVersion = "0.10.1";
  var pal;

  ProjectNotes_icons = {
    btn_createNew:"\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00\x0F\x00\x00\x00\x0E\b\x06\x00\x00\x00\u00F0\u008AF\u00EF\x00\x00\x00\x19tEXtSoftware\x00Adobe ImageReadyq\u00C9e<\x00\x00\x03xiTXtXML:com.adobe.xmp\x00\x00\x00\x00\x00<?xpacket begin=\"\u00EF\u00BB\u00BF\" id=\"W5M0MpCehiHzreSzNTczkc9d\"?> <x:xmpmeta xmlns:x=\"adobe:ns:meta/\" x:xmptk=\"Adobe XMP Core 5.5-c021 79.155772, 2014/01/13-19:44:00        \"> <rdf:RDF xmlns:rdf=\"http://www.w3.org/1999/02/22-rdf-syntax-ns#\"> <rdf:Description rdf:about=\"\" xmlns:xmpMM=\"http://ns.adobe.com/xap/1.0/mm/\" xmlns:stRef=\"http://ns.adobe.com/xap/1.0/sType/ResourceRef#\" xmlns:xmp=\"http://ns.adobe.com/xap/1.0/\" xmpMM:OriginalDocumentID=\"xmp.did:fbf0644b-fd67-4c8c-8d84-8df08ee65a3b\" xmpMM:DocumentID=\"xmp.did:3689A6CBAED911E4B510B2A52823F16C\" xmpMM:InstanceID=\"xmp.iid:3689A6CAAED911E4B510B2A52823F16C\" xmp:CreatorTool=\"Adobe Photoshop CC 2014 (Macintosh)\"> <xmpMM:DerivedFrom stRef:instanceID=\"xmp.iid:51c132ea-1a14-4ebe-b269-5d2bad84c3e3\" stRef:documentID=\"xmp.did:fbf0644b-fd67-4c8c-8d84-8df08ee65a3b\"/> </rdf:Description> </rdf:RDF> </x:xmpmeta> <?xpacket end=\"r\"?>\x05\u009Ec\u00D6\x00\x00\x00\u00D4IDATx\u00DAb\u00DC\u00BE};\x03\x16\u00C0\b\u00C4\u00B9@\u009C\t\u00C4\u00AD@\u00BC\x04\u009B\"&\x06\u00EC\u0080\x15\u0088\u00FD\u0080X\x03\u0088\u00BDq\u00A8\u00C1\u00A9\x19d\u00F3_(\u00FB\x0F9\u009A\u00FFC\u00D9\u00FFI\u00D5\u00FC\x03\u0088\x7F!\u00B1\u00B1\x02\x16\u00A8\x01f@,\x0B\u00D5\u00F0\x0F*.\rU\u00A3\f\u00F573\u00D4E\u00A0\u00F0\u00B8\x0B\u00C4\u00E7A\u008A\u00DC\u00A0\u00A1\u00C9\u0085\u00E4D\u0090\"v(\u00DB\x1E\u0088-\u00D0\u00BC\u00F4\x16\u0088}Y\u00A0\x1Cf\u00A8\x0B\u00FE\u00E3\t\x03F46\x13H\u00F3nh\u00B4\u00C8\x01\u00F1o\u00A8\u00B3A\u0086\u0095\x03\u00B1!\x10\x1F\x01\u00E2\u0089H\x16\u0080\u00F4\u00DC\u00869\x1B\x14\x15\u0087\u00B1\u00D8\x16\r\u00D5|\x0B\u0088\u00D7\u0093\x12\u00DA\x1C@\u00CC\u0086\u00C4&)\u00AA\u00FE\u00A3\u00F9\u0091d\u00CD,HI\x15g<c\x03\u00A0\u0080\u00DB\x02\u00C4\n@\u00BC\x1D\u0097f\u0080\x00\x03\x00\x17\u00B7$\u0089`2\u00CBw\x00\x00\x00\x00IEND\u00AEB`\u0082",
    btn_delete:"\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00\n\x00\x00\x00\x0E\b\x06\x00\x00\x00\x16\u00A3\u008D\u00AB\x00\x00\x00\x19tEXtSoftware\x00Adobe ImageReadyq\u00C9e<\x00\x00\x03xiTXtXML:com.adobe.xmp\x00\x00\x00\x00\x00<?xpacket begin=\"\u00EF\u00BB\u00BF\" id=\"W5M0MpCehiHzreSzNTczkc9d\"?> <x:xmpmeta xmlns:x=\"adobe:ns:meta/\" x:xmptk=\"Adobe XMP Core 5.5-c021 79.155772, 2014/01/13-19:44:00        \"> <rdf:RDF xmlns:rdf=\"http://www.w3.org/1999/02/22-rdf-syntax-ns#\"> <rdf:Description rdf:about=\"\" xmlns:xmpMM=\"http://ns.adobe.com/xap/1.0/mm/\" xmlns:stRef=\"http://ns.adobe.com/xap/1.0/sType/ResourceRef#\" xmlns:xmp=\"http://ns.adobe.com/xap/1.0/\" xmpMM:OriginalDocumentID=\"xmp.did:fbf0644b-fd67-4c8c-8d84-8df08ee65a3b\" xmpMM:DocumentID=\"xmp.did:368B5784AED911E4B510B2A52823F16C\" xmpMM:InstanceID=\"xmp.iid:368B5783AED911E4B510B2A52823F16C\" xmp:CreatorTool=\"Adobe Photoshop CC 2014 (Macintosh)\"> <xmpMM:DerivedFrom stRef:instanceID=\"xmp.iid:51c132ea-1a14-4ebe-b269-5d2bad84c3e3\" stRef:documentID=\"xmp.did:fbf0644b-fd67-4c8c-8d84-8df08ee65a3b\"/> </rdf:Description> </rdf:RDF> </x:xmpmeta> <?xpacket end=\"r\"?>\u00CA7\u00D7g\x00\x00\x00\u00EDIDATx\u00DA\u008C\u00D1=\u008A\u00C2P\x14\u0086a\u0093\u00886Q\u00F1\x07]\u00C1\b\u0082\u0095+\u0090\u00D9\u0080\u009D\u008D\u00AD\u0088\x0B\u00D1\u00DAM\f.`\u009AT\u00DA\u00BA\tA\x11D\x04\u00C1\x11\x0B\u00FF\u0093y\x0F|A\u008B\x01\u00E7\u00C2\u00D3$\u00DF9\u00F7\u00DC{\u009D \b\x12ZY\u008C\u00B0G\x1A>\u0086\u0098\u00DB\u00CF$r\u00FAQ\u00C0\x14\u00DF\u00FA\u00DED\t\x07\u00DC\u0093\u00EAR\u00C3\r\x17t\u00B5\u00C3\x1D)\x15\u00FD\u00C4\x1D}\x053p\x10%\u009E\u00CB5\x16\u00FC\u00C2\u00A7\x02'xrSG+\u009AY\u00B0\u0081\x0E6\u00A8(|\u00D2\u00E1\u00EC`e+r\u00B5]^'\\a\u00821\u0096\x18\u00E0\u008C\u00A2\x05C\u00CD\u00B2\u00B0\u00A1\u00B1U\u00F7\u0083\n\u00AD{\u00E8\u00BE\f\u009D\u00D2\u00E0\u009EN\u00EA\u00E9\u00DA\u009C\u00F8D\u00FFZ\u00EF\u0082\u00D1_\u00C1\u00BD\u00AE\u00C4f:\u00E2\u00AA\u0099\x1F\u00F1\x13\u00C6U}|h\u00AE\u00BA^\u00AB\u00A7\u00EB\u0089,\u00B8\u00C6\x0Em=\u00A1\u0085\u00AB\u00BA\u008D\u0096\x1A\u00AD\x7F\x05\x18\x00\u00DBn:\x1A\u00C0\u00DFY'\x00\x00\x00\x00IEND\u00AEB`\u0082",
    btn_expression:"\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00\f\x00\x00\x00\b\b\x06\x00\x00\x00\u00CD\u00E4\x1E\u00F1\x00\x00\x00\x19tEXtSoftware\x00Adobe ImageReadyq\u00C9e<\x00\x00\x03xiTXtXML:com.adobe.xmp\x00\x00\x00\x00\x00<?xpacket begin=\"\u00EF\u00BB\u00BF\" id=\"W5M0MpCehiHzreSzNTczkc9d\"?> <x:xmpmeta xmlns:x=\"adobe:ns:meta/\" x:xmptk=\"Adobe XMP Core 5.5-c021 79.155772, 2014/01/13-19:44:00        \"> <rdf:RDF xmlns:rdf=\"http://www.w3.org/1999/02/22-rdf-syntax-ns#\"> <rdf:Description rdf:about=\"\" xmlns:xmpMM=\"http://ns.adobe.com/xap/1.0/mm/\" xmlns:stRef=\"http://ns.adobe.com/xap/1.0/sType/ResourceRef#\" xmlns:xmp=\"http://ns.adobe.com/xap/1.0/\" xmpMM:OriginalDocumentID=\"xmp.did:fbf0644b-fd67-4c8c-8d84-8df08ee65a3b\" xmpMM:DocumentID=\"xmp.did:E9AB3A70C31511E4ABBED61964C1A26B\" xmpMM:InstanceID=\"xmp.iid:E9AB3A6FC31511E4ABBED61964C1A26B\" xmp:CreatorTool=\"Adobe Photoshop CC 2014 (Macintosh)\"> <xmpMM:DerivedFrom stRef:instanceID=\"xmp.iid:bc49f85e-9b67-4fcc-bf14-b887ffbe55a7\" stRef:documentID=\"xmp.did:fbf0644b-fd67-4c8c-8d84-8df08ee65a3b\"/> </rdf:Description> </rdf:RDF> </x:xmpmeta> <?xpacket end=\"r\"?>\u00F9Ph\u00C5\x00\x00\x00QIDATx\u00DAb\u00DC\u00BE}\u00FBA\x06\x06\x06m \u00FE\u00C3\u0080\x1F\u00B0\x00\u00F1U\x10a\n\u00C4\u009C\f\u00C4\x01S\u0090\u0086\x1B@\u00AC\f\u00C4\u00FF\t(f\x04\u00E2\u00BB \r\u00EE@,H\u00A4\u0086\u00F7L\f$\x02\u0090\r;Iu\u0092\x06\t\u009E\u00D6\x00i8MJ\u00B0\x02\x04\x18\x00\u00A7\u0094\x10qm\u00FF-N\x00\x00\x00\x00IEND\u00AEB`\u0082",
    btn_info:"\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00\x05\x00\x00\x00\x0E\b\x06\x00\x00\x00\u00E7\u00A8\u00D6&\x00\x00\x00\x19tEXtSoftware\x00Adobe ImageReadyq\u00C9e<\x00\x00\x03xiTXtXML:com.adobe.xmp\x00\x00\x00\x00\x00<?xpacket begin=\"\u00EF\u00BB\u00BF\" id=\"W5M0MpCehiHzreSzNTczkc9d\"?> <x:xmpmeta xmlns:x=\"adobe:ns:meta/\" x:xmptk=\"Adobe XMP Core 5.5-c021 79.155772, 2014/01/13-19:44:00        \"> <rdf:RDF xmlns:rdf=\"http://www.w3.org/1999/02/22-rdf-syntax-ns#\"> <rdf:Description rdf:about=\"\" xmlns:xmpMM=\"http://ns.adobe.com/xap/1.0/mm/\" xmlns:stRef=\"http://ns.adobe.com/xap/1.0/sType/ResourceRef#\" xmlns:xmp=\"http://ns.adobe.com/xap/1.0/\" xmpMM:OriginalDocumentID=\"xmp.did:fbf0644b-fd67-4c8c-8d84-8df08ee65a3b\" xmpMM:DocumentID=\"xmp.did:368B578CAED911E4B510B2A52823F16C\" xmpMM:InstanceID=\"xmp.iid:368B578BAED911E4B510B2A52823F16C\" xmp:CreatorTool=\"Adobe Photoshop CC 2014 (Macintosh)\"> <xmpMM:DerivedFrom stRef:instanceID=\"xmp.iid:fa5d1657-36de-4438-aa48-6667c9756f37\" stRef:documentID=\"xmp.did:fbf0644b-fd67-4c8c-8d84-8df08ee65a3b\"/> </rdf:Description> </rdf:RDF> </x:xmpmeta> <?xpacket end=\"r\"?>\x03\u0083\x06R\x00\x00\x00wIDATx\u00DAb\u00D9\u00BE};?\x03\x03\u00C3> \u00D6\x03\u00E2NOO\u00CF\x1A& \u00C3\x02\u0088\u008D\u0080\u0098\x05\u0088S\u0081\u0098\x01$x\x04\u0088\u00B7\x01\u00F1# ng\u00C0\x05X\u0080f>@\u00E2_\x03\u009A\u00E9\x052\u00E7\x0F\x10+\x011#\x10\x7F\x00\u009B\t\u0094Q\x01\u00D2\u00C7\u0090\u00B53A\u00E9?\u00D8\x04\x19\u00A8(\u00C8\bt\u00E7d \x1D\x0F\u00C4\u00BC@\u00FC\x1E\u00887\u0081\u00DC\u0099\u0083\u00A4H\x10\u00A4\x00 \u00C0\x00\u00ED\u00EC\x18I\t\x11\x03\u00E9\x00\x00\x00\x00IEND\u00AEB`\u0082",
    btn_refresh:"\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00\r\x00\x00\x00\x0E\b\x06\x00\x00\x00\u00F4\x7F\u0096\u00D2\x00\x00\x00\x19tEXtSoftware\x00Adobe ImageReadyq\u00C9e<\x00\x00\x03xiTXtXML:com.adobe.xmp\x00\x00\x00\x00\x00<?xpacket begin=\"\u00EF\u00BB\u00BF\" id=\"W5M0MpCehiHzreSzNTczkc9d\"?> <x:xmpmeta xmlns:x=\"adobe:ns:meta/\" x:xmptk=\"Adobe XMP Core 5.5-c021 79.155772, 2014/01/13-19:44:00        \"> <rdf:RDF xmlns:rdf=\"http://www.w3.org/1999/02/22-rdf-syntax-ns#\"> <rdf:Description rdf:about=\"\" xmlns:xmpMM=\"http://ns.adobe.com/xap/1.0/mm/\" xmlns:stRef=\"http://ns.adobe.com/xap/1.0/sType/ResourceRef#\" xmlns:xmp=\"http://ns.adobe.com/xap/1.0/\" xmpMM:OriginalDocumentID=\"xmp.did:fbf0644b-fd67-4c8c-8d84-8df08ee65a3b\" xmpMM:DocumentID=\"xmp.did:1B1F4E54AED711E4B510B2A52823F16C\" xmpMM:InstanceID=\"xmp.iid:1B1F4E53AED711E4B510B2A52823F16C\" xmp:CreatorTool=\"Adobe Photoshop CC 2014 (Macintosh)\"> <xmpMM:DerivedFrom stRef:instanceID=\"xmp.iid:51c132ea-1a14-4ebe-b269-5d2bad84c3e3\" stRef:documentID=\"xmp.did:fbf0644b-fd67-4c8c-8d84-8df08ee65a3b\"/> </rdf:Description> </rdf:RDF> </x:xmpmeta> <?xpacket end=\"r\"?>\u00D4\u00C1y\x10\x00\x00\x01\x04IDATx\u00DA\u008C\u00D2\u00BDKBQ\x18\u00C7\u00F1\u00EBE\u00A4\u00C1\x06_&q\x10\u0084\u00C0\u00D1\u00C5\u00D1\u00D5\x1A\x1B5h\u00D2\u00C8\u00AD\u00FE\x06\u00C1Yq\x11Q\u00D0\u00A0\u00A1%\u00DD\u00AEK\u00D0T\u0083.m\u00B9\u008B\u00A2$\u00D8\x14\x14\u0088\u00DF'\x1E\u00E1p\x11\u00BD\x0F|\u00E0r\u00CE\u00F9\u00DD\u00F3\u00EAs\x1C\u00C7\u00DASw\u00C8\u00A2\u008E7\u00FC\u0099\u009D\u00B6kp\x04\x19\\\u00E0\x12}T\x117\x07\u00F9\u008D\u00EFs\u00DC\u00E3\x04Im\x0B!\u0087'L\u00DD3\u00E5\u00D1\u00C4'\u00CAx\u00C6\x1A\r\u00ED\x1B\u00BBgJ\u00A3\u0082\u009A\u0092\u00EA`\u0080Wl\u00DC\x1B\u0096PI\u00FFT3\u00DA?\u00AC\x03e\u00EBL\u008F\u0096\u00B7\u00F2\u00EDB\u00B2\u00F1\u0089\u0087@\x02\u00B7\u0088\u00D9\u00BA\u00E6\u0080\u0087\u00D0\x19\u008A\u0088J\u00E8[\u00EF\u00E6X\u00A50\u00C3\\BC=\u008C\u00D3\x03\u00810\u00AE\u00F0\u008E\u0095\u0084z\u00BA\u00C46\u0082{\x02\u00F2JZ\u00F8\u00D11\x1B9\u00F2\x05n\u00F4n^\u00D0\u00C5HOJ\u0096]\u00C0\u00AF\u008EY\u00FE\x1F\u00A1\u00F1`c\u00B8\u00D6g\x13\u00D2\u00B6/]\u00FE\u00C3. \u00B5\x15`\x00k\u00944;Z^\x02\u009E\x00\x00\x00\x00IEND\u00AEB`\u0082",
    btn_rename:"\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00\x0E\x00\x00\x00\x0E\b\x06\x00\x00\x00\x1FH-\u00D1\x00\x00\x00\x19tEXtSoftware\x00Adobe ImageReadyq\u00C9e<\x00\x00\x03xiTXtXML:com.adobe.xmp\x00\x00\x00\x00\x00<?xpacket begin=\"\u00EF\u00BB\u00BF\" id=\"W5M0MpCehiHzreSzNTczkc9d\"?> <x:xmpmeta xmlns:x=\"adobe:ns:meta/\" x:xmptk=\"Adobe XMP Core 5.5-c021 79.155772, 2014/01/13-19:44:00        \"> <rdf:RDF xmlns:rdf=\"http://www.w3.org/1999/02/22-rdf-syntax-ns#\"> <rdf:Description rdf:about=\"\" xmlns:xmpMM=\"http://ns.adobe.com/xap/1.0/mm/\" xmlns:stRef=\"http://ns.adobe.com/xap/1.0/sType/ResourceRef#\" xmlns:xmp=\"http://ns.adobe.com/xap/1.0/\" xmpMM:OriginalDocumentID=\"xmp.did:fbf0644b-fd67-4c8c-8d84-8df08ee65a3b\" xmpMM:DocumentID=\"xmp.did:3689A6CFAED911E4B510B2A52823F16C\" xmpMM:InstanceID=\"xmp.iid:3689A6CEAED911E4B510B2A52823F16C\" xmp:CreatorTool=\"Adobe Photoshop CC 2014 (Macintosh)\"> <xmpMM:DerivedFrom stRef:instanceID=\"xmp.iid:51c132ea-1a14-4ebe-b269-5d2bad84c3e3\" stRef:documentID=\"xmp.did:fbf0644b-fd67-4c8c-8d84-8df08ee65a3b\"/> </rdf:Description> </rdf:RDF> </x:xmpmeta> <?xpacket end=\"r\"?>-\u00A7\u00E3\u00CE\x00\x00\x00\u00F5IDATx\u00DAb\u00DC\u00BE};\x03\x11\u0080\x1B\u0088\u00B3\u0081\u00D8\x13\u0088'\x03\u00F1z\x16\x06\u00E2@\b\x10wB\u00D9\u00EA@\u00FC\u008F\u0089\u0080\x066 v\x01\u00E2\u00A7@\u00BC\x1B*&\t\u00C4\t\u00844\x16\x02\u00F1\x06\u00A8\u00E6L >\x0E\u00C4\u00CF\u0080x:>\u00A7\u0082\u00FCT\x0B\u00F5_\x19\x103\x03q\x15T\u00EE\x00\x13\x1EM\u009DPM \u00C0\br\x1E\x10?\x02i\x02\t`\u00D3\u0098\u0089\u00A6\t\x04^A\r{\x04\x13@wj2\x10w`\u00D1\u0094\x03\u00C4\u00AB\u0091\x15\u00C24r\x02q\x04\x10w\x031\x1F\u0092\u00FC{h\x00\u00ADFw\x16L\u00A3\x1C\x10\u00F7\x01\u00B1\x00\u009A\u00A6< ^\u0086-\x10@~T\u0082j\u0098\x06\u00C4\x7F\u00A0\u00E2_\u0080\u00B8\b\u0088\u0097\u00E0\nr\u0090\u008D\u00FE@\x1C\r\u00C41@\u00FC\x1B\u00EA\u009F: ^\u0080/\u0082\u0099\u00A0I\u00C8\x18\u0088\u00E7\x00\u00F1^ \u00F6\x06\u00E2\u0099\u0084\u00D2 \x0B4\x04\u008F\x01\u00F1a ~\x03\u00C4\u00D7\u0089I\u00BC\x00\x01\x06\x00\"q+\u00A5\u00CE\u0094\u00CD\u00EA\x00\x00\x00\x00IEND\u00AEB`\u0082",
    btn_saveFile:"\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00\x11\x00\x00\x00\x0E\b\x06\x00\x00\x00\u00C9\u00ED\u00F7\u00B4\x00\x00\x00\x19tEXtSoftware\x00Adobe ImageReadyq\u00C9e<\x00\x00\x03xiTXtXML:com.adobe.xmp\x00\x00\x00\x00\x00<?xpacket begin=\"\u00EF\u00BB\u00BF\" id=\"W5M0MpCehiHzreSzNTczkc9d\"?> <x:xmpmeta xmlns:x=\"adobe:ns:meta/\" x:xmptk=\"Adobe XMP Core 5.5-c021 79.155772, 2014/01/13-19:44:00        \"> <rdf:RDF xmlns:rdf=\"http://www.w3.org/1999/02/22-rdf-syntax-ns#\"> <rdf:Description rdf:about=\"\" xmlns:xmpMM=\"http://ns.adobe.com/xap/1.0/mm/\" xmlns:stRef=\"http://ns.adobe.com/xap/1.0/sType/ResourceRef#\" xmlns:xmp=\"http://ns.adobe.com/xap/1.0/\" xmpMM:OriginalDocumentID=\"xmp.did:fbf0644b-fd67-4c8c-8d84-8df08ee65a3b\" xmpMM:DocumentID=\"xmp.did:3689A6C7AED911E4B510B2A52823F16C\" xmpMM:InstanceID=\"xmp.iid:3689A6C6AED911E4B510B2A52823F16C\" xmp:CreatorTool=\"Adobe Photoshop CC 2014 (Macintosh)\"> <xmpMM:DerivedFrom stRef:instanceID=\"xmp.iid:51c132ea-1a14-4ebe-b269-5d2bad84c3e3\" stRef:documentID=\"xmp.did:fbf0644b-fd67-4c8c-8d84-8df08ee65a3b\"/> </rdf:Description> </rdf:RDF> </x:xmpmeta> <?xpacket end=\"r\"?>\u0094h\x1E\u00C4\x00\x00\x01&IDATx\u00DA\u0094\u00D3=/\x04Q\x14\u00C6\u00F1\x19\u0086\u00AC\u00C5\x16\u00A2Yb\u00BD5\x1A\u0089\u0082\u00ED|\x03\x15\u00A2\u00D0\u00CA&\x12\x05\u009F\u0080\u0082B\u00A2R\x10\u0085R\u00A7\u0095L\u00B2\u00A2\u00D0o\u00A1\u00DCj7Q(\x14\x12\x11/!k\u00FDO\u00F2\x14\u0093\u009B{\x17'\u00F957g\u009E9\u00F7\u00DE\u00998M\u00D3\u00C8Sk8D\x1FZ\u00C8\u00E1\x12\u00DB\u00F8t\u009B\u0093\u00C8_\u00B3\u0098t\u00D6\x16\u00D0\u00EF\x0B\u00E9\n\u0084\u00B4<km\u00F4\u00F8\u009A\u00DD\u00902\u00CE\u00B5\x1D\u00B7\u00A6p\u008A\u008A\u00B6\x17\u00DC\u00CE46\x02\u00D3\ra\x051.:Mr\u0085\u00E3(\\w\u00D8\u00C7{\u00A7\u0090\x17\u00EC\u00E9&\u00DC\u00BA\u00C7\u008E\u0082~=\u00D8gl\u00A2\u009AY{\u00C4\x16n}\u00E3\u00D9\u0099\u008C\u00E8,\u00DA\x12k\u00A2\x03\f`\x1CGh`\x11\u00DFz\u00B6\x1BO\u00A8[\u00C8\u00AEnc\x10o\u00FA\x0E\u00EC*\u00AFq\u00A2\u00E61\u00DC\u00A07\x13b\u00BBx\u00C0\u00BA\u0085\u00CC\u00A0\u00A0\u00F1\u00E7PT\u00D3*&t\x16K\np+o\u00FD\u0096\u00F6\u00A1=\u00DBg^s\u009A\u00E6\u00B1\x1C\b\u00B0z\u00C5W\u00A2\u00B1\u0086q\u0086\u00D1\u00E8\x7Fe\u00E1I\u00A2\u00B7\u00DB\x7FQ\u00CAL\u00F5\u0097\u00B2s\u00AB\u00A3\u00F9#\u00C0\x00\u008E47\u0086\x10\x19\u00AD5\x00\x00\x00\x00IEND\u00AEB`\u0082"
  }


  function projectNotes_buildUI(thisObj) {
    pal = (thisObj instanceof Panel) ? thisObj : new Window('palette', "ProjectNotes", undefined, {resizeable: true});

    if (pal !== null) {
      // Set up UI elements
      pal.grp = pal.add('group');
        pal.grp.orientation = 'column';
        pal.grp.alignment = ['fill', 'fill'];

       // Create Header
        pal.header = pal.grp.add('group');
          pal.header.alignment = ['fill', 'top'];
          pal.header.alignChildren = ['right', 'top'];
          pal.header.spacing = 0;

          // Create buttons
          pal.btn_expression = pal.header.add('iconbutton', [0,0,25,25], ProjectNotes_icons.btn_expression, {style: 'toolbutton'});
            pal.btn_expression.helpTip = "Apply text as expression to selected properties";
          pal.btn_createNew = pal.header.add('IconButton', [0,0,25,25], ProjectNotes_icons.btn_createNew, {style: 'toolbutton'});
            pal.btn_createNew.helpTip = "Create a new Note";
          pal.btn_save = pal.header.add('iconbutton', [0,0,25,25], ProjectNotes_icons.btn_saveFile, {style: 'toolbutton'});
            pal.btn_save.helpTip = "Save current note as a file";
          pal.btn_refresh = pal.header.add('iconbutton', [0,0,25,25], ProjectNotes_icons.btn_refresh, {style: 'toolbutton'});
            pal.btn_refresh.helpTip = "Reload notes";
          pal.btn_info = pal.header.add('iconbutton', [0,0,25,25], ProjectNotes_icons.btn_info, {style: 'toolbutton'});
            pal.btn_info.helpTip = "Information about the panel";

        // Create noteArea
        pal.noteArea = pal.grp.add('edittext', undefined, undefined, {multiline:true});
          pal.noteArea.alignment = ['fill', 'fill'];
          pal.noteArea.minimumSize = [-1, 100];

        // Create Footer
        pal.footer = pal.grp.add('group');
          pal.footer.alignment = ['fill', 'bottom'];
          pal.footer.alignChildren = ['right', 'bottom'];
          pal.footer.spacing = 2;

          pal.selectNote = pal.footer.add('dropdownlist', undefined);
            pal.selectNote.alignment = ['fill', 'fill'];
            pal.selectNote.enabled = false;

          pal.btn_rename = pal.footer.add('iconbutton', [0,0,25,25], ProjectNotes_icons.btn_rename, {style: 'toolbutton'});
            pal.btn_rename.helpTip = "Rename the current note";
            pal.btn_rename.enabled = false;
          pal.btn_delete = pal.footer.add('iconbutton', [0,0,25,25], ProjectNotes_icons.btn_delete, {style: 'toolbutton'});
            pal.btn_delete.helpTip = "Delete the current note";
            pal.btn_delete.enabled = false;

      // Set up layout
      pal.layout.layout(true);
      pal.size = [500, 500];
      pal.layout.resize();
      pal.onResizing = pal.onResize = function () {this.layout.resize(); }

      projectNotes_getSaveComp();

      // Check for save comp when clicking in the window
      // Remove eventhandler so it only check the first time
      // function onFirstActivate() {
      //   projectNotes_getSaveComp(true);
      //   pal.removeEventListener('focus', onFirstActivate);
      // }
      // pal.addEventListener('focus', onFirstActivate);
      pal.onActivate = function() {};

      // Event Handlers
      pal.btn_expression.onClick = function () {projectNotes_applyExpression(pal)}
      pal.btn_createNew.onClick = function () {projectNotes_newNote()}
      pal.btn_save.onClick = function () {projectNotes_saveAsFile()}
      pal.btn_refresh.onClick = function () {projectNotes_getSaveComp(true)}
      pal.btn_info.onClick = function () {projectNotes_info()}
      pal.noteArea.onChange = function () {pal.saveLayer.property('Source Text').setValue(this.text)};
      pal.selectNote.onChange = function () {projectNotes_changeNote()}
      pal.btn_delete.onClick = function () {projectNotes_deleteNote()}
      pal.btn_rename.onClick = function () {projectNotes_renameNote()}

      // Hitting tab shifts the focus by default
      // Remove default event and inserts a tab in the noteArea
      pal.noteArea.addEventListener('keydown', function(event) {
        if (event.keyName == 'Tab') {
          event.preventDefault();
          pal.noteArea.textselection = '\t';
        }
      });
    }
    return pal;
  }



  // Event Handler Functions
  function projectNotes_getSaveComp (createComp) {
    // Set deafult
    if (typeof createComp === 'undefined') createComp = false;

    //createComp true forces the script to create comp in empty projects
    if (app.project.numItems > 0 || createComp == true) {
      // Find the saveComp
      // Loop trough all items and check if it is a comp with the correct name

      var foundSaveComp = false;
      for (i = 1; i <= app.project.numItems; i++) {
        if (app.project.item(i).name == "ProjectNotes" && app.project.item(i) instanceof CompItem) {
          pal.saveComp = app.project.item(i);
          foundSaveComp = true;
          break;
        }
      }
      //  Create Comp if none found
      if (! foundSaveComp ) {
        pal.saveComp = app.project.items.addComp("ProjectNotes", 10,10,1,1,25);
      }


      // Find the saveLayer
      var foundSaveLayer = false;
      if (pal.saveComp.numLayers > 0) {
        // Remove all items in dropdown
        pal.selectNote.removeAll();

        // Add all text layers in saveComp to the dropdownlist
        for (i = 1; i <= pal.saveComp.numLayers; i++) {
          if (pal.saveComp.layer(i) instanceof TextLayer) {
            pal.selectNote.add('item', pal.saveComp.layer(i).name);
            foundSaveLayer = true;
          }
        }

        // Set saveLayer to last item of savecomp
        pal.saveLayer = pal.saveComp.layer(pal.saveComp.numLayers);
        pal.noteArea.text = pal.saveLayer.property('Source Text').value;

        // Enable the button that require more than one note
        // Set the dropdownlist to the latest note
        // Change the text field to the correct note
        if (pal.selectNote.items.length > 1) {
          projectNotes_multiNotes(true);
          pal.selectNote.selection = pal.selectNote.length-1;
          projectNotes_changeNote();
        }
      }

      // Create the save layer if none is found
      if (! foundSaveLayer) {
        pal.saveLayer = pal.saveComp.layers.addText();
        pal.saveLayer.name = "ProjectNotes save";
        pal.selectNote.add('item', pal.saveLayer.name);
      }
    }
  }

  function projectNotes_changeNote() {
    // Get selected note text from comp and update noteArea
    pal.saveLayer = pal.saveComp.layer(pal.selectNote.selection.text);
    pal.noteArea.text = pal.saveLayer.property('Source Text').value;
  }

  function projectNotes_deleteNote () {
    var currentNote = pal.selectNote.selection;
    var confirmation = confirm('Do you want to delete: "'+currentNote.text+'"?', false);

    if (confirmation == true) {

      if (currentNote.index-1 != -1) {
        pal.selectNote.selection = currentNote.index-1;
      }else{
        pal.selectNote.selection = currentNote.index+1;
      }
      projectNotes_changeNote();

      if (pal.selectNote.items.length-1 == 1) {
        projectNotes_multiNotes(false);
        pal.selectNote.selection = 0;
      }
      pal.saveComp.layer(currentNote.text).remove();
      pal.selectNote.remove(currentNote.index);
    }
  }


  function projectNotes_renameNote(oldName, newName) {
    // Set default values
    if (typeof oldName === 'undefined') oldName = pal.selectNote.selection.text;
    if (typeof newName === 'undefined') newName = projectNotes_saveNoteDialog('Rename "'+oldName+'" to');

    // rename in dropdown and comp based on index of layer in comp
    if (newName != false) {
      var noteIndex = pal.saveComp.layer(oldName).index;
      pal.selectNote.items[noteIndex-1].text = newName;
      pal.saveComp.layer(oldName).name = newName;
    }
  }

  function projectNotes_newNote () {
    var selectNote = pal.selectNote;

    var canceled = false;

    // If only one note: change name of the first layer of the save comp.
    if (selectNote.items.length === 1) {
      var saveAs = projectNotes_saveNoteDialog("Save current Note as:");

      if (saveAs != false) {
        projectNotes_renameNote(1, saveAs);
      }else{
        canceled = true;
      }
    }

    if (!canceled) {
      var saveAs = projectNotes_saveNoteDialog("Save new Note as:");

      if (saveAs != false) {
        // Add text comp
        pal.saveLayer = pal.saveComp.layers.addText();
        pal.saveLayer.name = saveAs;
        pal.saveLayer.moveToEnd(); // To get the equal indexes in the comp and dropdown

        // Update selectNote
        selectNote.add('item', saveAs);
        selectNote.selection = selectNote.items.length-1;
        projectNotes_changeNote();

        // Enable buttons that only function if there is multiple notes
        // Runs only when creating the second note
        if (selectNote.items.length == 2) {
          projectNotes_multiNotes(true);
        }
      }
    }
  }

  function projectNotes_saveAsFile() {
    // Check if script is allowed to write to system; Alert if not.
    var securitySetting = app.preferences.getPrefAsLong('Main Pref Section', 'Pref_SCRIPTING_FILE_NETWORK_SECURITY');
    if (securitySetting != 1) {
      alert('You need to check "Allow Scripts to Write Files and Access Network" in your preferences to save your note as a file.');
    }

    else {
      // Open system save dialog
      var saveFile = File.saveDialog();

      if (saveFile != null) {
        // Open file in write mode
        saveFile.open('w');

        // Check if filename ends with .txt. If not: add extension
        // If no extension: add extension.
        fileName = saveFile.name.split('.');
        if (fileName.length == 1 || fileName[fileName.length-1] != 'txt') {
          saveFile.rename(saveFile.name + '.txt');
        }

        // write to file
        saveFile.write(noteArea.text);
        saveFile.close();
      }
    }
  }

  function projectNotes_applyExpression (pal) {
    comp = app.project.activeItem;
    
    if (comp.selectedProperties != null) {
      for (var i = 0; i < comp.selectedProperties.length; i++) {
        if (comp.selectedProperties[i].canSetExpression == true) {
          comp.selectedProperties[i].expression = pal.noteArea.text;
        }
      }
    }else{
      alert("Error: No property \n"+
        "You must have selected at least one property for this feature to work");
    }
  }

  function projectNotes_info () {
    alert("ProjectNotes \n" +
      "Version " + scriptVersion +"\n" +
      "Copyright (c) 2015  Rune Gangsø\n" +
      "A panel for writing down notes or todos for the current project. "+
      "The script will create a comp where the notes are stored.\n" +
      "\n" +
      "Features:\n" +
      "- Multiple notes.\n" +
      "- Exporting notes to disk.\n" +
      "- Renaming and deleting notes.\n" +
      "\n" +
      "Have some feedback or a suggestion?\n" +
      "Send an email to projectnotes@runegang.so\n" +
      "or send \n" +
      "\n" +
      "\n" +
      "Legal:\n" +
      "ProjectNotes is free software: you can redistribute it and/or modify " +
      "it under the terms of the GNU General Public License as published by " +
      "the Free Software Foundation, either version 3 of the License, or " +
      "(at your option) any later version.\n" +
      "\n" +
      "ProjectNotes is distributed in the hope that it will be useful, " +
      "but WITHOUT ANY WARRANTY; without even the implied warranty of " +
      "MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the " +
      "GNU General Public License for more details.\n" +
      "\n" +
      "You should have received a copy of the GNU General Public License " +
      "along with this program.  If not, see http://www.gnu.org/licenses/.\n" +
      "\n" +
      "Icons made by Freepik from http://www.flaticon.com is licensed " +
      "under CC BY 3.0 http://creativecommons.org/licenses/by/3.0/");
  }

  //Extra functions
  function projectNotes_saveNoteDialog (dialogText) {
    // Set default text
    if (typeof dialogText === 'undefined') { dialogText = "Save new Note as:"; }

    var savePal = new Window('dialog', 'Save Note')

    var res =
    "group { \
      orientation: 'column', \
      alignment: 'left', \
      alignChildren: 'left', \
      st: StaticText {text:'"+ dialogText +":'}, \
      saveAs: EditText {text:'', characters: 30}, \
      buttons: Group { \
        orientation: 'row', \
        alignment: ['center', 'fill'], \
        cancel: Button {text: 'Cancel', properties: {name: 'Cancel'}}, \
        ok: Button {text: 'OK', enabled: false, properties: {name: 'OK'}} \
      } \
    }";

    savePal.grp = savePal.add(res)

    savePal.grp.saveAs.active = true;

    savePal.grp.saveAs.onChanging = function() {
      // Enable OK button if not empty
      if (this.text.length == 0){
        savePal.grp.buttons.ok.enabled = false;
      }else{
        savePal.grp.buttons.ok.enabled = true;
      }
    }

    savePal.grp.buttons.cancel.onClick = function() {
      // The function will return false to check if the function was canceled
      saveAsText = false;
      savePal.close();
    }

    savePal.grp.buttons.ok.onClick = function() {
      saveAsText = savePal.grp.saveAs.text;

      // Check if a note has the same name as the input name
      var duplicate = false;
      for (i = 0; i <= pal.selectNote.items.length; i++) {
        if (pal.selectNote.items[i].text === saveAsText) {
          duplicate = true;
          break;
        }
      }

      if (duplicate) {
        alert("There is already a note with that name.");
      }else{
        savePal.close();
      }
    }

    savePal.show();
    return saveAsText;
  }

  function projectNotes_multiNotes (TrueFalse) {
    pal.selectNote.enabled = TrueFalse;
    pal.btn_rename.enabled = TrueFalse;
    pal.btn_delete.enabled = TrueFalse;
  }


  // Show panel
  rgpnPal = projectNotes_buildUI(thisObj);

  if (rgpnPal !== null) {

    if ( rgpnPal instanceof Window ) {

      // Show the palette
      rgpnPal.center();
      rgpnPal.show();
    }
    else {
        rgpnPal.layout.layout(true);
    }
  }
})(this);
