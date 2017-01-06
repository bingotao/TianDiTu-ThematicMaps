using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Optimization;

namespace JXGIS.Common.BaseLib
{
    public class BabelBundle : Bundle
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="BabelBundle"/> class.
        /// </summary>
        /// <param name="virtualPath">
        /// The virtual path used to reference the <see cref="T:System.Web.Optimization.Bundle" />
        /// from within a view or Web page.
        /// </param>
        public BabelBundle(string virtualPath) : base(virtualPath, GetTransforms())
        {
            base.ConcatenationToken = ";" + Environment.NewLine;
        }

        /// <summary>
        /// Gets the transformations that should be used by the bundle.
        /// </summary>
        /// <returns>The transformations</returns>
        private static IBundleTransform[] GetTransforms()
        {
            return new IBundleTransform[] { new BabelTransform(), new JsMinify() };
        }
    }
}
